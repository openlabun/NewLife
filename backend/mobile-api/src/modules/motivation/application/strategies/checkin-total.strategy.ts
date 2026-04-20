import { Injectable } from '@nestjs/common';
import { IChallengeEvaluator } from './challenge-evaluator.interface';
import { DatabaseService } from '../../../database/infrastructure/database.service';

@Injectable()
export class CheckinTotalStrategy implements IChallengeEvaluator {
  constructor(private readonly db: DatabaseService) {}

  async evaluate(usuarioId: string, target: number, fechaInicio: string, userToken: string): Promise<number> {
    const result = await this.db.find('registro_diario', { usuario_id: usuarioId }, userToken);
    const rows = Array.isArray(result) ? result : (result?.rows ?? []);
    
    const fechaArranque = new Date(fechaInicio).getTime();
    
    // Solo contamos los check-ins hechos DESPUÉS de unirse al reto
    const validCheckins = rows.filter((r: any) => new Date(r.fecha).getTime() >= fechaArranque);
    
    return Math.min(validCheckins.length, target);
  }
}