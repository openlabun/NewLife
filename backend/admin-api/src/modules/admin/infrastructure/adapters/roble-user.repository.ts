import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RobleHttpService } from '../services/roble-http.service';
import {
  IAdminUserRepository,
  CreateAdminUserInput,
  UpdateAdminUserInput,
} from '../../domain/ports/admin-user.repository.port';
import { AdminUser, UserRole, UserStatus } from '../../domain/entities/admin-user.entity';

const USERS_TABLE = 'usuarios';

@Injectable()
export class RobleUserRepository implements IAdminUserRepository {
  constructor(private readonly roble: RobleHttpService) {}

  // Mapea una fila cruda de Roble a la entidad AdminUser
  private mapRow(row: Record<string, unknown>): AdminUser {
  
  return new AdminUser({
    _id:              row._id as string,
    usuario_id:       row.usuario_id as string,
    email:            row.email as string,
    nombre:           row.nombre as string,
    rol:              (row.rol as UserRole) ?? UserRole.USUARIO,
    estado:           (row.estado as UserStatus) ?? UserStatus.ACTIVO,
    suspension_hasta: (row.suspension_hasta as string) || null,
    created_at:       row.created_at as string,
    last_login:       row.last_login as string,
  });
}

  async findById(id: string): Promise<AdminUser | null> {
    const rows = await this.roble.dbRead<unknown[]>(USERS_TABLE, { _id: id });
    if (!rows || rows.length === 0) return null;
    return this.mapRow(rows[0] as Record<string, unknown>);
  }

  async findByEmail(email: string): Promise<AdminUser | null> {
    const rows = await this.roble.dbRead<unknown[]>(USERS_TABLE, { email });
    if (!rows || rows.length === 0) return null;
    return this.mapRow(rows[0] as Record<string, unknown>);
  }

  async findByUsuarioId(usuarioId: string): Promise<AdminUser | null> {
    const rows = await this.roble.dbRead<unknown[]>(USERS_TABLE, {
      usuario_id: usuarioId,
    });
    if (!rows || rows.length === 0) return null;
    return this.mapRow(rows[0] as Record<string, unknown>);
  }

  async findAll(filters?: { rol?: UserRole; estado?: UserStatus }): Promise<AdminUser[]> {
    const rows = await this.roble.dbRead<unknown[]>(USERS_TABLE, filters || {});
    if (!rows) return [];
    return (rows as Record<string, unknown>[]).map((r) => this.mapRow(r));
  }

  async create(data: CreateAdminUserInput): Promise<AdminUser> {
    const result = await this.roble.dbInsert<{
      inserted: Record<string, unknown>[];
      skipped: unknown[];
    }>(USERS_TABLE, [
      {
        usuario_id: data.usuario_id,
        email:      data.email,
        nombre:     data.nombre,
        rol:        data.rol    || UserRole.USUARIO,
        estado:     data.estado || UserStatus.ACTIVO,
      },
    ]);

    if (!result.inserted || result.inserted.length === 0) {
      throw new InternalServerErrorException(
        `No se pudo crear el usuario en Roble. Skipped: ${JSON.stringify(result.skipped)}`,
      );
    }

    return this.mapRow(result.inserted[0]);
  }

  async update(id: string, data: UpdateAdminUserInput): Promise<AdminUser> {
    const updates: Record<string, unknown> = {};

    if (data.rol              !== undefined) updates.rol              = data.rol;
    if (data.estado           !== undefined) updates.estado           = data.estado;
    if (data.suspension_hasta !== undefined) updates.suspension_hasta = data.suspension_hasta;
    if (data.last_login       !== undefined) updates.last_login       = data.last_login;

    const updated = await this.roble.dbUpdate<Record<string, unknown>>(
      USERS_TABLE,
      '_id',
      id,
      updates,
    );

    if (!updated) {
      throw new NotFoundException(`Usuario con _id ${id} no encontrado`);
    }

    return this.mapRow(updated);
  }
}