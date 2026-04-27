import { AdminUser, UserRole, UserStatus } from '../entities/admin-user.entity';

export interface CreateAdminUserInput {
  usuario_id: string;
  email: string;
  nombre: string;
  rol?: UserRole;
  estado?: UserStatus;
}

export interface UpdateAdminUserInput {
  rol?: UserRole;
  estado?: UserStatus;
  suspension_hasta?: string | null;
  last_login?: string;
}

export interface CreateAdminUserInput {
  usuario_id: string;
  email: string;
  nombre: string;
  rol?: UserRole;
  estado?: UserStatus;
}

export interface UpdateAdminUserInput {
  rol?: UserRole;
  estado?: UserStatus;
  suspension_hasta?: string | null;
  last_login?: string;
}

export interface FindAllFilters {
  rol?: UserRole;
  estado?: UserStatus;
}

export interface IAdminUserRepository {
  findById(id: string): Promise<AdminUser | null>;
  findByEmail(email: string): Promise<AdminUser | null>;
  findByUsuarioId(usuarioId: string): Promise<AdminUser | null>;
  findAll(filters?: FindAllFilters): Promise<AdminUser[]>;
  create(data: CreateAdminUserInput): Promise<AdminUser>;
  update(id: string, data: UpdateAdminUserInput): Promise<AdminUser>;
}

export const ADMIN_USER_REPOSITORY = 'ADMIN_USER_REPOSITORY';

export interface IAdminUserRepository {
  findById(id: string): Promise<AdminUser | null>;
  findByEmail(email: string): Promise<AdminUser | null>;
  findByUsuarioId(usuarioId: string): Promise<AdminUser | null>;
  findAll(filters?: { rol?: UserRole; estado?: UserStatus }): Promise<AdminUser[]>;
  create(data: CreateAdminUserInput): Promise<AdminUser>;
  update(id: string, data: UpdateAdminUserInput): Promise<AdminUser>;
  delete(id: string): Promise<void>;
}