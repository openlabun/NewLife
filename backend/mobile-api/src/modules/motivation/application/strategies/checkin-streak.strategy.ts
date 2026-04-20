import { Injectable } from '@nestjs/common';
import { IChallengeEvaluator } from './challenge-evaluator.interface';
import { DatabaseService } from '../../../database/infrastructure/database.service';

@Injectable()
export class CheckinStreakStrategy implements IChallengeEvaluator {
  constructor(private readonly db: DatabaseService) {}

  async evaluate(usuarioId: string, target: number, fechaInicio: string, userToken: string): Promise<number> {
    const result = await this.db.find('registro_diario', { usuario_id: usuarioId }, userToken);
    let rows = Array.isArray(result) ? result : (result?.rows ?? []);
    
    // Ignoramos el pasado
    const fechaArranque = new Date(fechaInicio).toISOString().split('T')[0];
    rows = rows.filter((r: any) => new Date(r.fecha).toISOString().split('T')[0] >= fechaArranque);

    if (!rows.length) return 0;

    const dates = [...new Set<string>(rows.map((r: any) => new Date(r.fecha).toISOString().split('T')[0]))]
      .sort((a, b) => b.localeCompare(a));
    
    let streak = 0;
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (dates[0] !== todayStr && dates[0] !== yesterdayStr) return 0;

    let currentDate = new Date(dates[0]);
    for (const d of dates) {
      if (d === currentDate.toISOString().split('T')[0]) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return Math.min(streak, target);
  }
}