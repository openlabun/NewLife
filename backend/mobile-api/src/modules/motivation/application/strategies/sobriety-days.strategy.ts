import { Injectable } from '@nestjs/common';
import { IChallengeEvaluator } from './challenge-evaluator.interface';
import { DatabaseService } from '../../../database/infrastructure/database.service';

@Injectable()
export class SobrietyDaysStrategy implements IChallengeEvaluator {
  constructor(private readonly db: DatabaseService) {}

  async evaluate(usuarioId: string, target: number, fechaInicio: string, userToken: string, masterToken: string): Promise<number> {
    const result = await this.db.find('sobriedad', { usuario_id: usuarioId }, masterToken);
    const rows = Array.isArray(result) ? result : (result?.rows ?? []);
    
    const inicioReto = new Date(fechaInicio);
    let fechaReferencia = inicioReto;

    if (rows.length > 0 && rows[0].fecha_ultimo_consumo) {
      const ultimoConsumo = new Date(rows[0].fecha_ultimo_consumo);
      
      // ¿Consumió ANTES o DESPUÉS de unirse/reiniciar el reto?
      if (ultimoConsumo > inicioReto) {
        // Consumió durante el reto. El contador se reinicia desde la fecha del consumo.
        fechaReferencia = ultimoConsumo;
      } else {
        // El consumo fue en el pasado (incluso horas antes de reiniciar el reto). 
        // Empezamos a contar desde que inició el reto.
        fechaReferencia = inicioReto;
      }
    }

    // Calculamos días calendario exactos a las 00:00 para evitar fallos por horas
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const ref = new Date(fechaReferencia);
    ref.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - ref.getTime();
    const daysSober = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Asegurarnos de que no de números negativos en el mismo día
    return Math.min(Math.max(daysSober, 0), target);
  }
}