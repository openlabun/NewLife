import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserRole } from '../../domain/entities/admin-user.entity';
import { AdminTokenPayload } from '../../application/services/admin-auth.service';

export const ROLES_KEY = 'roles';

// Decorador para usar en controllers
// Ejemplo: @Roles(UserRole.SUPERADMIN)
// Ejemplo: @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si no hay @Roles() definido, solo requiere estar autenticado
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<Request & { admin: AdminTokenPayload }>();

    const admin = request.admin;

    if (!admin) {
      throw new ForbiddenException('Sin autenticación.');
    }

    const hasRole = requiredRoles.includes(admin.rol as UserRole);

    if (!hasRole) {
      throw new ForbiddenException(
        `Acción no permitida. Se requiere uno de estos roles: ${requiredRoles.join(', ')}.`,
      );
    }

    return true;
  }
}