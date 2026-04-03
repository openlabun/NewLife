// backend/admin-api/src/modules/admin/application/use-cases/create-admin.use-case.ts

import {
  Injectable,
  Inject,
  ConflictException,
} from '@nestjs/common';
import type { IAdminAuthPort } from '../../domain/ports/admin-auth.port';
import { ADMIN_AUTH_PORT } from '../../domain/ports/admin-auth.port';
import type { IAdminUserRepository } from '../../domain/ports/admin-user.repository.port';
import { ADMIN_USER_REPOSITORY } from '../../domain/ports/admin-user.repository.port';
import { UserRole, UserStatus } from '../../domain/entities/admin-user.entity';

export interface CreateAdminInput {
  email: string;
  password: string;
  nombre: string;
}

export interface CreateAdminResult {
  id: string;
  email: string;
  nombre: string;
  rol: UserRole;
}

@Injectable()
export class CreateAdminUseCase {
  constructor(
    @Inject(ADMIN_AUTH_PORT)
    private readonly authPort: IAdminAuthPort,
    @Inject(ADMIN_USER_REPOSITORY)
    private readonly userRepo: IAdminUserRepository,
  ) {}

  async execute(input: CreateAdminInput): Promise<CreateAdminResult> {
    // 1. Verificar que el email no existe ya en nuestra tabla
    const existing = await this.userRepo.findByEmail(input.email);
    if (existing) {
      throw new ConflictException(
        `Ya existe un usuario con el correo ${input.email}.`,
      );
    }

    // 2. Crear la cuenta en Roble sin verificación de correo
    const robleUser = await this.authPort.signupDirect(
      input.email,
      input.password,
      input.nombre,
    );

    // 3. Registrar en nuestra tabla con rol ADMIN
    const newAdmin = await this.userRepo.create({
      usuario_id: robleUser.id,
      email:      robleUser.email,
      nombre:     input.nombre,
      rol:        UserRole.ADMIN,
      estado:     UserStatus.ACTIVO,
    });

    return {
      id:     newAdmin._id,
      email:  newAdmin.email,
      nombre: newAdmin.nombre,
      rol:    newAdmin.rol,
    };
  }
}