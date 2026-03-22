import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IAdminUserRepository } from '../../domain/ports/admin-user.repository.port';
import { ADMIN_USER_REPOSITORY, FindAllFilters } from '../../domain/ports/admin-user.repository.port';
import { UserRole, UserStatus } from '../../domain/entities/admin-user.entity';

export interface GetUsersQuery {
    rol?: UserRole;
    estado?: UserStatus;
}

export interface UserListItem {
    id: string;
    usuario_id: string;
    email: string;
    nombre: string;
    rol: UserRole;
    estado: UserStatus;
    suspension_hasta: string | null;
    created_at: string | undefined;
    last_login: string | undefined;

}

@Injectable()
export class GetUsersUseCase {
    constructor(
        @Inject(ADMIN_USER_REPOSITORY)
        private readonly userRepo: IAdminUserRepository,
    ) { }

    async execute(query?: GetUsersQuery): Promise<UserListItem[]> {
        const filters: FindAllFilters = {};

        if (query?.rol) filters.rol = query.rol;
        if (query?.estado) filters.estado = query.estado;

        const users = await this.userRepo.findAll(filters);

        return users.map((u) => ({
            id: u._id,
            usuario_id: u.usuario_id,
            email: u.email,
            nombre: u.nombre,
            rol: u.rol,
            estado: u.estado,
            suspension_hasta: u.suspension_hasta ?? null,
            created_at: u.created_at,
            last_login: u.last_login,
        }));
    }

    async executeOne(id: string): Promise<UserListItem> {
        const user = await this.userRepo.findById(id);
        if (!user) {
            throw new NotFoundException(`Usuario ${id} no encontrado.`);
        }
        return {
            id: user._id,
            usuario_id: user.usuario_id,
            email: user.email,
            nombre: user.nombre,
            rol: user.rol,
            estado: user.estado,
            suspension_hasta: user.suspension_hasta ?? null,
            created_at: user.created_at,
            last_login: user.last_login,
        };
    }
}