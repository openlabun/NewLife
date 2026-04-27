import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import type { IAdminUserRepository } from '../../domain/ports/admin-user.repository.port';
import { ADMIN_USER_REPOSITORY } from '../../domain/ports/admin-user.repository.port';
import { UserRole, UserStatus } from '../../domain/entities/admin-user.entity';
import { COMMUNITY_REPOSITORY } from '../../domain/ports/community.repository.port';

export interface ChangeUserStatusInput {
  userId: string;
  estado: UserStatus;
  // Solo requerido cuando estado = SUSPENDIDO
  // Puede ser en días: { dias: 7 } o fecha exacta: { hasta: '2026-04-01' }
  suspension?: {
    dias?: number;
    hasta?: string;
  };
}

export interface ChangeUserStatusResult {
  id: string;
  email: string;
  nombre: string;
  estado: UserStatus;
  suspension_hasta: string | null;
}

@Injectable()
export class ChangeUserStatusUseCase {
  constructor(
    @Inject(ADMIN_USER_REPOSITORY)
    private readonly userRepo: IAdminUserRepository,
    @Inject(COMMUNITY_REPOSITORY)
    private readonly communityRepo: any,
  ) { }

  async execute(input: ChangeUserStatusInput): Promise<ChangeUserStatusResult> {
    // 1. Verificar que el usuario existe
    const user = await this.userRepo.findById(input.userId);
    if (!user) {
      throw new NotFoundException(`Usuario ${input.userId} no encontrado.`);
    }

    // 2. No se puede cambiar el estado de un ADMIN o SUPERADMIN
    if (user.isAdmin()) {
      throw new BadRequestException(
        'No se puede cambiar el estado de un administrador.',
      );
    }

    // 3. Si ya tiene ese estado no hacemos nada
    if (user.estado === input.estado && input.estado !== UserStatus.SUSPENDIDO) {
      throw new BadRequestException(
        `El usuario ya tiene el estado ${input.estado}.`,
      );
    }

    // 4. Calcular suspension_hasta si aplica
    let suspension_hasta: string | null = null;

    if (input.estado === UserStatus.SUSPENDIDO) {
      if (!input.suspension) {
        throw new BadRequestException(
          'Debes indicar la duración de la suspensión (dias o hasta).',
        );
      }

      if (input.suspension.hasta) {
        // Fecha exacta
        const fecha = new Date(input.suspension.hasta);
        if (isNaN(fecha.getTime())) {
          throw new BadRequestException('La fecha de suspensión no es válida.');
        }
        if (fecha <= new Date()) {
          throw new BadRequestException(
            'La fecha de suspensión debe ser futura.',
          );
        }
        suspension_hasta = fecha.toISOString();
      } else if (input.suspension.dias) {
        // Calcular fecha desde hoy + N días
        if (input.suspension.dias <= 0) {
          throw new BadRequestException(
            'Los días de suspensión deben ser mayor a 0.',
          );
        }
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + input.suspension.dias);
        suspension_hasta = fecha.toISOString();
      } else {
        throw new BadRequestException(
          'Debes indicar dias o hasta para la suspensión.',
        );
      }
    }

    // 5. Si pasa a ACTIVO o BANEADO limpiamos suspension_hasta
    if (input.estado === UserStatus.ACTIVO || input.estado === UserStatus.BANEADO) {
      suspension_hasta = null;
    }

    // 6. Actualizar
    const updated = await this.userRepo.update(input.userId, {
      estado: input.estado,
      suspension_hasta,
    });

    // ← NUEVO: si se banea o elimina, remover de todas las comunidades
    if (input.estado === UserStatus.BANEADO || input.estado === UserStatus.ELIMINADO) {
      const memberships = await this.communityRepo.findAllMembershipsByUsuarioId(input.userId);
      for (const m of memberships) {
        await this.communityRepo.removeMember(m._id);
      }
    }

    return {
      id: updated._id,
      email: updated.email,
      nombre: updated.nombre,
      estado: updated.estado,
      suspension_hasta: updated.suspension_hasta ?? null,
    };
  }
}