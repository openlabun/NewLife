export enum UserRole {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  MODERADOR = 'MODERADOR',
  USUARIO = 'USUARIO',
}

export enum UserStatus {
  ACTIVO = 'ACTIVO',
  SUSPENDIDO = 'SUSPENDIDO',
  BANEADO = 'BANEADO',
  ELIMINADO = 'ELIMINADO',
}

export class AdminUser {
  _id: string;
  usuario_id: string;
  email: string;
  nombre: string;
  rol: UserRole;
  estado: UserStatus;
  suspension_hasta?: string | null;
  created_at?: string;
  last_login?: string;

  constructor(partial: Partial<AdminUser>) {
    Object.assign(this, partial);
  }

  isAdmin(): boolean {
    return this.rol === UserRole.ADMIN || this.rol === UserRole.SUPERADMIN;
  }

  isSuperAdmin(): boolean {
    return this.rol === UserRole.SUPERADMIN;
  }

  isActive(): boolean {
    return this.estado === UserStatus.ACTIVO;
  }

  isSuspended(): boolean {
    if (this.estado !== UserStatus.SUSPENDIDO) return false;
    if (!this.suspension_hasta) return true;
    return new Date(this.suspension_hasta) > new Date();
  }

  isBanned(): boolean {
    return this.estado === UserStatus.BANEADO;
  }

  canAccess(): boolean {
    return this.isActive() && !this.isSuspended() && !this.isBanned();
  }
}