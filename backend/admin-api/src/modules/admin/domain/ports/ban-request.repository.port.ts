import { BanRequest, BanRequestStatus } from '../entities/ban-request.entity';

export interface CreateBanRequestInput {
  usuario_id:   string;
  moderador_id: string;
  comunidad_id: string;
  motivo:       string;
}

export const BAN_REQUEST_REPOSITORY = 'BAN_REQUEST_REPOSITORY';

export interface IBanRequestRepository {
  findAll(filters?: { estado?: BanRequestStatus }): Promise<BanRequest[]>;
  findById(id: string): Promise<BanRequest | null>;
  create(data: CreateBanRequestInput): Promise<BanRequest>;
  updateStatus(id: string, estado: BanRequestStatus): Promise<BanRequest>;
}