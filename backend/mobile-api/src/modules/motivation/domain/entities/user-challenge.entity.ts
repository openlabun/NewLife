export class UserChallengeEntity {
  _id!: string;
  user_reto_id!: string;
  usuario_id!: string;
  reto_id!: string;
  estado!: 'ACTIVE' | 'COMPLETED' | 'FAILED';
  progreso_actual!: number;
  fecha_inicio!: string;
  fecha_completado?: string;

  constructor(partial: Partial<UserChallengeEntity>) {
    Object.assign(this, partial);
  }
}