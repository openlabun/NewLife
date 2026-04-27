import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RobleHttpService } from '../services/roble-http.service';
import {
  ICommunityRepository,
  CreateCommunityInput,
  UpdateCommunityInput,
  AddMemberInput,
  UpdateMemberInput,
} from '../../domain/ports/community.repository.port';
import {
  Community,
  ComunidadUsuario,
  TipoAcceso,
} from '../../domain/entities/community.entity';

const COMMUNITIES_TABLE = 'comunidades';
const COMMUNITY_USERS_TABLE = 'comunidad_usuarios';

@Injectable()
export class RobleCommunityRepository implements ICommunityRepository {
  constructor(private readonly roble: RobleHttpService) { }

  // ── Mappers ───────────────────────────────────────────────────────────────

  private mapCommunity(row: Record<string, unknown>): Community {
    return new Community({
      _id: row._id as string,
      nombre: row.nombre as string,
      descripcion: (row.descripcion as string) || null,
      creado_por: row.creado_por as string,
      created_at: row.created_at as string,
      activa: row.activa as boolean,
    });
  }

  private mapMember(row: Record<string, unknown>): ComunidadUsuario {
    return new ComunidadUsuario({
      _id: row._id as string,
      comunidad_id: row.comunidad_id as string,
      usuario_id: row.usuario_id as string,
      tipo_acceso: (row.tipo_acceso as TipoAcceso) ?? TipoAcceso.SOLO_VER,
      es_moderador: row.es_moderador as boolean,
      joined_at: row.joined_at as string,
    });
  }

  // ── Comunidades ───────────────────────────────────────────────────────────

  async findAll(): Promise<Community[]> {
    const rows = await this.roble.dbRead<unknown[]>(COMMUNITIES_TABLE, {});
    if (!rows || rows.length === 0) return [];
    return (rows as Record<string, unknown>[]).map((r) => this.mapCommunity(r));
  }

  async findById(id: string): Promise<Community | null> {
    const rows = await this.roble.dbRead<unknown[]>(COMMUNITIES_TABLE, { _id: id });
    if (!rows || rows.length === 0) return null;
    return this.mapCommunity(rows[0] as Record<string, unknown>);
  }

  async create(data: CreateCommunityInput): Promise<Community> {
    const result = await this.roble.dbInsert<{
      inserted: Record<string, unknown>[];
      skipped: unknown[];
    }>(COMMUNITIES_TABLE, [
      {
        nombre: data.nombre,
        descripcion: data.descripcion ?? null,
        creado_por: data.creado_por,
        created_at: new Date().toISOString(),
        activa: true,
      },
    ]);

    if (!result.inserted || result.inserted.length === 0) {
      throw new InternalServerErrorException(
        `No se pudo crear la comunidad. Skipped: ${JSON.stringify(result.skipped)}`,
      );
    }

    return this.mapCommunity(result.inserted[0]);
  }

  async update(id: string, data: UpdateCommunityInput): Promise<Community> {
    const updates: Record<string, unknown> = {};
    if (data.nombre !== undefined) updates.nombre = data.nombre;
    if (data.descripcion !== undefined) updates.descripcion = data.descripcion;
    if (data.activa !== undefined) updates.activa = data.activa;

    const updated = await this.roble.dbUpdate<Record<string, unknown>>(
      COMMUNITIES_TABLE,
      '_id',
      id,
      updates,
    );

    if (!updated) throw new NotFoundException(`Comunidad ${id} no encontrada.`);
    return this.mapCommunity(updated);
  }

  async delete(id: string): Promise<void> {
    // Primero eliminar todos los miembros de la comunidad
    const members = await this.findMembers(id);
    for (const member of members) {
      await this.removeMember(member._id);
    }
    // Luego eliminar la comunidad
    await this.roble.dbDelete(COMMUNITIES_TABLE, '_id', id);
  }

  // ── Miembros ──────────────────────────────────────────────────────────────

  async findMembers(comunidadId: string): Promise<ComunidadUsuario[]> {
    const rows = await this.roble.dbRead<unknown[]>(COMMUNITY_USERS_TABLE, {
      comunidad_id: comunidadId,
    });
    if (!rows || rows.length === 0) return [];
    return (rows as Record<string, unknown>[]).map((r) => this.mapMember(r));
  }

  async findMember(
    comunidadId: string,
    usuarioId: string,
  ): Promise<ComunidadUsuario | null> {
    const rows = await this.roble.dbRead<unknown[]>(COMMUNITY_USERS_TABLE, {
      comunidad_id: comunidadId,
      usuario_id: usuarioId,
    });
    if (!rows || rows.length === 0) return null;
    return this.mapMember(rows[0] as Record<string, unknown>);
  }

  async addMember(data: AddMemberInput): Promise<ComunidadUsuario> {
    const result = await this.roble.dbInsert<{
      inserted: Record<string, unknown>[];
      skipped: unknown[];
    }>(COMMUNITY_USERS_TABLE, [
      {
        comunidad_id: data.comunidad_id,
        usuario_id: data.usuario_id,
        tipo_acceso: data.tipo_acceso,
        es_moderador: data.es_moderador,
        joined_at: new Date().toISOString(),
      },
    ]);

    if (!result.inserted || result.inserted.length === 0) {
      throw new InternalServerErrorException(
        `No se pudo agregar el miembro. Skipped: ${JSON.stringify(result.skipped)}`,
      );
    }

    return this.mapMember(result.inserted[0]);
  }

  async updateMember(
    memberId: string,
    data: UpdateMemberInput,
  ): Promise<ComunidadUsuario> {
    const updates: Record<string, unknown> = {};
    if (data.tipo_acceso !== undefined) updates.tipo_acceso = data.tipo_acceso;
    if (data.es_moderador !== undefined) updates.es_moderador = data.es_moderador;

    const updated = await this.roble.dbUpdate<Record<string, unknown>>(
      COMMUNITY_USERS_TABLE,
      '_id',
      memberId,
      updates,
    );

    if (!updated) throw new NotFoundException(`Miembro ${memberId} no encontrado.`);
    return this.mapMember(updated);
  }

  async removeMember(memberId: string): Promise<void> {
    await this.roble.dbDelete(COMMUNITY_USERS_TABLE, '_id', memberId);
  }

  async findAllMembershipsByUsuarioId(usuarioId: string): Promise<ComunidadUsuario[]> {
    const rows = await this.roble.dbRead<unknown[]>(COMMUNITY_USERS_TABLE, {
      usuario_id: usuarioId,
    });
    if (!rows || rows.length === 0) return [];
    return (rows as Record<string, unknown>[]).map(r => this.mapMember(r));
  }
}