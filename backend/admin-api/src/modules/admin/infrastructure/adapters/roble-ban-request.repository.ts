import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RobleHttpService } from '../services/roble-http.service';
import {
  IBanRequestRepository,
  CreateBanRequestInput,
} from '../../domain/ports/ban-request.repository.port';
import { BanRequest, BanRequestStatus } from '../../domain/entities/ban-request.entity';

const BAN_TABLE = 'solicitudes_baneo';

@Injectable()
export class RobleBanRequestRepository implements IBanRequestRepository {
  constructor(private readonly roble: RobleHttpService) {}

  private mapRow(row: Record<string, unknown>): BanRequest {
    return new BanRequest({
      _id:          row._id as string,
      usuario_id:   row.usuario_id as string,
      moderador_id: row.moderador_id as string,
      comunidad_id: row.comunidad_id as string,
      motivo:       row.motivo as string,
      estado:       (row.estado as BanRequestStatus) ?? BanRequestStatus.PENDIENTE,
      created_at:   row.created_at as string,
    });
  }

  async findAll(filters?: { estado?: BanRequestStatus }): Promise<BanRequest[]> {
    const rows = await this.roble.dbRead<unknown[]>(BAN_TABLE, filters || {});
    if (!rows || rows.length === 0) return [];
    return (rows as Record<string, unknown>[]).map(r => this.mapRow(r));
  }

  async findById(id: string): Promise<BanRequest | null> {
    const rows = await this.roble.dbRead<unknown[]>(BAN_TABLE, { _id: id });
    if (!rows || rows.length === 0) return null;
    return this.mapRow(rows[0] as Record<string, unknown>);
  }

  async create(data: CreateBanRequestInput): Promise<BanRequest> {
    const result = await this.roble.dbInsert<{
      inserted: Record<string, unknown>[];
      skipped:  unknown[];
    }>(BAN_TABLE, [{
      usuario_id:   data.usuario_id,
      moderador_id: data.moderador_id,
      comunidad_id: data.comunidad_id,
      motivo:       data.motivo,
      estado:       BanRequestStatus.PENDIENTE,
      created_at:   new Date().toISOString(),
    }]);

    if (!result.inserted || result.inserted.length === 0) {
      throw new InternalServerErrorException(
        `No se pudo crear la solicitud. Skipped: ${JSON.stringify(result.skipped)}`
      );
    }
    return this.mapRow(result.inserted[0]);
  }

  async updateStatus(id: string, estado: BanRequestStatus): Promise<BanRequest> {
    const updated = await this.roble.dbUpdate<Record<string, unknown>>(
      BAN_TABLE, '_id', id, { estado }
    );
    if (!updated) throw new NotFoundException(`Solicitud ${id} no encontrada.`);
    return this.mapRow(updated);
  }
}