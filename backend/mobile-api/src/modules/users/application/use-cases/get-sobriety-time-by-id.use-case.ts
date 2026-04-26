import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';

@Injectable()
export class GetSobrietyTimeByIdUseCase {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
  ) {}

  async execute(robleId: string) {
    const masterToken = await this.systemAuth.getMasterToken();

    // 🔹 1. Buscar usuario por _id (Roble)
    const userRes = await this.dbService.find(
      'usuarios',
      { _id: robleId },
      masterToken
    );

    const userRows = Array.isArray(userRes) ? userRes : (userRes?.rows ?? []);
    const user = userRows[0];

    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    const usuarioUuid = user.usuario_id;

    // 🔹 2. Buscar sobriedad usando UUID
    const sobriedadRes = await this.dbService.find(
      'sobriedad',
      { usuario_id: usuarioUuid },
      masterToken
    );

    const sobriedadRows = Array.isArray(sobriedadRes)
      ? sobriedadRes
      : (sobriedadRes?.rows ?? []);

    const record = sobriedadRows[0];

    if (!record) {
      throw new NotFoundException('No se encontró información de sobriedad.');
    }

    // 🔹 3. Calcular tiempo
    const fechaUltimoConsumo = new Date(record.fecha_ultimo_consumo);

    const ahoraCol = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' })
    );

    const diffMs = Math.max(
      0,
      ahoraCol.getTime() - fechaUltimoConsumo.getTime()
    );

    const totalMinutos = Math.floor(diffMs / (1000 * 60));
    const totalHoras = Math.floor(totalMinutos / 60);

    const dias = Math.floor(totalHoras / 24);
    const horas = totalHoras % 24;
    const minutos = totalMinutos % 60;

    return {
      usuario_id: usuarioUuid,
      roble_id: robleId,
      fecha_ultimo_consumo: record.fecha_ultimo_consumo,
      actualizado_el: record.updated_at,
      contador: {
        dias,
        horas,
        minutos,
      },
    };
  }
}