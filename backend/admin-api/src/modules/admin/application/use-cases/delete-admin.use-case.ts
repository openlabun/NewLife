import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import type { IAdminUserRepository } from '../../domain/ports/admin-user.repository.port';
import { ADMIN_USER_REPOSITORY } from '../../domain/ports/admin-user.repository.port';

@Injectable()
export class DeleteAdminUseCase {
  constructor(
    @Inject(ADMIN_USER_REPOSITORY)
    private readonly userRepo: IAdminUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuario ${id} no encontrado.`);
    }
    if (user.isSuperAdmin()) {
      throw new ForbiddenException('No se puede eliminar un SUPERADMIN.');
    }
    if (!user.isAdmin()) {
      throw new BadRequestException(
        'Solo se pueden eliminar administradores desde este endpoint.',
      );
    }
    await this.userRepo.delete(id);
  }
}