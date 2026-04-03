import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import type { IAdminUserRepository } from '../../domain/ports/admin-user.repository.port';
import { ADMIN_USER_REPOSITORY } from '../../domain/ports/admin-user.repository.port';
import { UserRole } from '../../domain/entities/admin-user.entity';

export interface ChangeUserRoleResult {
  id: string;
  email: string;
  nombre: string;
  rol: UserRole;
}

@Injectable()
export class ChangeUserRoleUseCase {
  constructor(
    @Inject(ADMIN_USER_REPOSITORY)
    private readonly userRepo: IAdminUserRepository,
  ) { }


  async execute(userId: string, newRol: UserRole): Promise<ChangeUserRoleResult> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new NotFoundException(`Usuario ${userId} no encontrado.`);
    }

    // No se puede tocar a admins
    if (user.isAdmin()) {
      throw new BadRequestException(
        'No se puede cambiar el rol de un administrador desde este endpoint.',
      );
    }

    // Solo se permite cambiar entre USUARIO y MODERADOR
    const rolesPermitidos = [UserRole.USUARIO, UserRole.MODERADOR];
    if (!rolesPermitidos.includes(newRol)) {
      throw new BadRequestException(
        'Solo se puede asignar rol USUARIO o MODERADOR.',
      );
    }

    if (user.rol === newRol) {
      throw new BadRequestException(`El usuario ya tiene el rol ${newRol}.`);
    }

    const updated = await this.userRepo.update(userId, { rol: newRol });

    return {
      id: updated._id,
      email: updated.email,
      nombre: updated.nombre,
      rol: updated.rol,
    };
  }
}