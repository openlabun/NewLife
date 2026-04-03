import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AdminTokenPayload } from '../../application/services/admin-auth.service';
import { TokenBlacklistService } from '../../infrastructure/services/token-blacklist.service';

@Injectable()
export class AdminJwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly blacklist: TokenBlacklistService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Token de acceso requerido.');
    }

    // Verifica si el token fue invalidado por logout
    if (this.blacklist.isBlacklisted(token)) {
      throw new UnauthorizedException('La sesión ha sido cerrada.');
    }

    try {
      const payload = this.jwtService.verify<AdminTokenPayload>(token, {
        secret: this.config.get<string>('ADMIN_JWT_SECRET'),
      });
      (request as Request & { admin: AdminTokenPayload }).admin = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido o expirado.');
    }
  }

  private extractToken(request: Request): string | null {
    const auth = request.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return null;
    return auth.substring(7);
  }
}