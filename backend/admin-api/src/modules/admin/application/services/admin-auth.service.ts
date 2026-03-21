import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { IAdminAuthPort } from '../../domain/ports/admin-auth.port';
import { ADMIN_AUTH_PORT } from '../../domain/ports/admin-auth.port';
import type { IAdminUserRepository } from '../../domain/ports/admin-user.repository.port';
import { ADMIN_USER_REPOSITORY } from '../../domain/ports/admin-user.repository.port';
import { UserRole } from '../../domain/entities/admin-user.entity';
import { TokenBlacklistService } from '../../infrastructure/services/token-blacklist.service';

export interface AdminTokenPayload {
  sub:         string;
  email:       string;
  rol:         UserRole;
  roble_token: string;
}

export interface MeResponse {
  id:     string;
  email:  string;
  nombre: string;
  rol:    UserRole;
  estado: string;
}

@Injectable()
export class AdminAuthService {
  constructor(
    @Inject(ADMIN_AUTH_PORT)
    private readonly authPort: IAdminAuthPort,
    @Inject(ADMIN_USER_REPOSITORY)
    private readonly userRepo: IAdminUserRepository,
    private readonly jwtService: JwtService,
    private readonly blacklist: TokenBlacklistService,
  ) {}

  async refreshToken(expiredJwt: string): Promise<{ accessToken: string }> {
    const decoded = this.jwtService.decode(expiredJwt) as AdminTokenPayload;

    if (!decoded?.roble_token) {
      throw new UnauthorizedException('Token inválido.');
    }

    const robleResult = await this.authPort.refreshRobleToken(decoded.roble_token);
    const robleUser = await this.authPort.verifyRobleToken(robleResult.accessToken);

    const user = await this.userRepo.findByUsuarioId(robleUser.id);
    if (!user || !user.isAdmin()) {
      throw new UnauthorizedException('Sesión inválida.');
    }

    if (!user.canAccess()) {
      throw new UnauthorizedException('Tu cuenta ya no tiene acceso al panel.');
    }

    const payload: AdminTokenPayload = {
      sub:         user._id,
      email:       user.email,
      rol:         user.rol,
      roble_token: robleResult.accessToken,
    };

    return { accessToken: this.jwtService.sign(payload) };
  }

  async logout(robleToken: string, jwt: string): Promise<void> {
    // Invalida en Roble
    await this.authPort.logoutFromRoble(robleToken);
    // Invalida el JWT propio en memoria
    this.blacklist.add(jwt);
  }

  async getMe(userId: string): Promise<MeResponse> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado.');
    }
    return {
      id:     user._id,
      email:  user.email,
      nombre: user.nombre,
      rol:    user.rol,
      estado: user.estado,
    };
  }
}