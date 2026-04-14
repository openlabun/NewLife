export enum BanRequestStatus {
  PENDIENTE  = 'PENDIENTE',
  APROBADA   = 'APROBADA',
  RECHAZADA  = 'RECHAZADA',
}

export class BanRequest {
  _id:          string;
  usuario_id:   string;
  moderador_id: string;
  comunidad_id: string;
  motivo:       string;
  estado:       BanRequestStatus;
  created_at?:  string;

  constructor(partial: Partial<BanRequest>) {
    Object.assign(this, partial);
  }

  isPending(): boolean {
    return this.estado === BanRequestStatus.PENDIENTE;
  }
}