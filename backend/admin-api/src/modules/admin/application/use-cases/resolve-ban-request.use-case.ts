import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  BAN_REQUEST_REPOSITORY,
} from '../../domain/ports/ban-request.repository.port';
import {
  ADMIN_USER_REPOSITORY,
} from '../../domain/ports/admin-user.repository.port';
import type {
  IAdminUserRepository,
} from '../../domain/ports/admin-user.repository.port';
import type {
  IBanRequestRepository,
} from '../../domain/ports/ban-request.repository.port';
import { BanRequestStatus } from '../../domain/entities/ban-request.entity';
import { UserStatus } from '../../domain/entities/admin-user.entity';

@Injectable()
export class ResolveBanRequestUseCase {
  constructor(
    @Inject(BAN_REQUEST_REPOSITORY)
    private readonly banRepo: IBanRequestRepository,
    @Inject(ADMIN_USER_REPOSITORY)
    private readonly userRepo: IAdminUserRepository,
  ) {}

  async execute(id: string, decision: 'APROBADA' | 'RECHAZADA') {
    // 1. Verificar que existe y está pendiente
    const request = await this.banRepo.findById(id);
    if (!request) {
      throw new NotFoundException(`Solicitud ${id} no encontrada.`);
    }
    if (!request.isPending()) {
      throw new BadRequestException(
        `La solicitud ya fue ${request.estado.toLowerCase()}.`
      );
    }

    // 2. Si se aprueba, banear al usuario
    if (decision === 'APROBADA') {
      const user = await this.userRepo.findById(request.usuario_id);
      if (!user) {
        throw new NotFoundException(`Usuario ${request.usuario_id} no encontrado.`);
      }
      await this.userRepo.update(request.usuario_id, {
        estado: UserStatus.BANEADO,
        suspension_hasta: null,
      });
    }

    // 3. Actualizar estado de la solicitud
    const updated = await this.banRepo.updateStatus(
      id,
      decision === 'APROBADA' ? BanRequestStatus.APROBADA : BanRequestStatus.RECHAZADA
    );

    return updated;
  }
}