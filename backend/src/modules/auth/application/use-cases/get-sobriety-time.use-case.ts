import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../infrastructure/services/system-auth.service';

@Injectable()
export class GetSobrietyTimeUseCase {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
  ) {}

  async execute(userId: string) {
    const masterToken = await this.systemAuth.getMasterToken();

    const res = await this.dbService.find('sobriedad', { usuario_id: userId }, masterToken);
    const rows = Array.isArray(res) ? res : (res.rows || []);

    if (rows.length === 0) {
      throw new NotFoundException('No se encontró información de sobriedad.');
    }

    const fechaUltimoConsumo = new Date(rows[0].fecha_ultimo_consumo);
    const updatedAt = new Date(rows[0].updated_at);
    const ahora = new Date();
    
    const diffMs = Math.max(0, ahora.getTime() - fechaUltimoConsumo.getTime());

    const totalMinutos = Math.floor(diffMs / (1000 * 60));
    const totalHoras = Math.floor(totalMinutos / 60);

    const dias = Math.floor(totalHoras / 24);
    const horas = totalHoras % 24;
    const minutos = totalMinutos % 60;

    return {
      usuario_id: userId,
      fecha_ultimo_consumo: rows[0].fecha_ultimo_consumo,
      actualizado_el: rows[0].updated_at, 
      contador: {
        dias,
        horas,
        minutos
      }
    };
  }
}