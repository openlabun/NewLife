import {
  Injectable,
  Inject,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { IAdminAuthPort } from '../../domain/ports/admin-auth.port';
import { ADMIN_AUTH_PORT } from '../../domain/ports/admin-auth.port';
import type { IAdminUserRepository } from '../../domain/ports/admin-user.repository.port';
import { ADMIN_USER_REPOSITORY } from '../../domain/ports/admin-user.repository.port';
import { UserRole } from '../../domain/entities/admin-user.entity';

export interface LoginAdminResult {
  accessToken: string;
  user: {
    id: string;
    email: string;
    nombre: string;
    rol: UserRole;
  };
}

@Injectable()
export class LoginAdminUseCase {
  constructor(
    @Inject(ADMIN_AUTH_PORT)
    private readonly authPort: IAdminAuthPort,
    @Inject(ADMIN_USER_REPOSITORY)
    private readonly userRepo: IAdminUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, password: string): Promise<LoginAdminResult> {
    // 1. Autenticar contra Roble con las credenciales del admin
    const robleResult = await this.authPort.loginWithRoble(email, password);

    // 2. Verificar el token y obtener los datos del usuario en Roble
    const robleUser = await this.authPort.verifyRobleToken(robleResult.accessToken);

    // 3. Buscar el usuario en nuestra tabla por usuario_id
    const user = await this.userRepo.findByUsuarioId(robleUser.id);

    if (!user) {
      throw new ForbiddenException(
        'No tienes acceso al panel de administración. Contacta al superadmin.',
      );
    }

    // 4. Verificar que tiene rol de ADMIN o SUPERADMIN
    if (!user.isAdmin()) {
      throw new ForbiddenException(
        'No tienes permisos para acceder al panel de administración.',
      );
    }

    // 5. Verificar que su cuenta puede acceder (no suspendida ni baneada)
    if (!user.canAccess()) {
      if (user.isBanned()) {
        throw new UnauthorizedException('Tu cuenta ha sido baneada.');
      }
      if (user.isSuspended()) {
        throw new UnauthorizedException(
          `Tu cuenta está suspendida hasta ${user.suspension_hasta}.`,
        );
      }
      throw new UnauthorizedException('Tu cuenta no está activa.');
    }

    // 6. Actualizar last_login
    await this.userRepo.update(user._id, {
      last_login: new Date().toISOString(),
    });

    // 7. Generar nuestro propio JWT
    const payload = {
      sub:         user._id,
      email:       user.email,
      rol:         user.rol,
      roble_token: robleResult.accessToken,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id:     user._id,
        email:  user.email,
        nombre: user.nombre,
        rol:    user.rol,
      },
    };
  }
}