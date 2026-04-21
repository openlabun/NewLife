import { Injectable } from '@nestjs/common';
import { IChallengeEvaluator } from './challenge-evaluator.interface';
import { DatabaseService } from '../../../database/infrastructure/database.service';

@Injectable()
export class CheckinStreakStrategy implements IChallengeEvaluator {
  constructor(private readonly db: DatabaseService) {}

  async evaluate(usuarioId: string, target: number, userToken: string): Promise<number> {
    // ✅ Obtener TODOS los registros del usuario
    const result = await this.db.find('registro_diario', { usuario_id: usuarioId }, userToken);
    let rows = Array.isArray(result) ? result : (result?.rows ?? []);
    
    if (!rows.length) {
      console.log(`[CheckinStreakStrategy] Sin registros para usuario ${usuarioId}`);
      return 0;
    }

    // ✅ Obtener días ÚNICOS (no contar múltiples registros el mismo día)
    const diasUnicos = [...new Set<string>(
      rows.map((r: any) => new Date(r.fecha).toISOString().split('T')[0])
    )].sort((a, b) => b.localeCompare(a)); // Orden descendente (más reciente primero)

    console.log(`[CheckinStreakStrategy] Días únicos encontrados: ${diasUnicos.length}`);
    console.log(`[CheckinStreakStrategy] Últimos 5 días: ${diasUnicos.slice(0, 5).join(', ')}`);

    if (!diasUnicos.length) return 0;

    // ✅ Contar racha desde HOY o AYER
    let streak = 0;
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // ✅ La racha debe comenzar desde hoy o ayer
    if (diasUnicos[0] !== todayStr && diasUnicos[0] !== yesterdayStr) {
      console.log(`[CheckinStreakStrategy] Racha rota. Último registro: ${diasUnicos[0]}, Hoy: ${todayStr}`);
      return 0;
    }

    // ✅ Contar días consecutivos
    let currentDate = new Date(diasUnicos[0]);
    for (const d of diasUnicos) {
      const currentDateStr = currentDate.toISOString().split('T')[0];
      if (d === currentDateStr) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    const resultado = Math.min(streak, target);
    console.log(`[CheckinStreakStrategy] Racha calculada: ${streak} días (capped a ${target})`);
    return resultado;
  }
}