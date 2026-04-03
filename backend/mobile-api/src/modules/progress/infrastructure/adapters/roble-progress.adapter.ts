import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { IProgressProviderPort, GratitudeEntryResult } from '../../domain/ports/progress-provider.port';
import { DailyCheckinEntity } from '../../domain/entities/daily-checkin.entity';
import { CaminoEntity } from '../../domain/entities/camino.entity';

@Injectable()
export class RobleProgressAdapter implements IProgressProviderPort {
  constructor(private readonly dbService: DatabaseService) {}

  async createDailyCheckin(data: Partial<DailyCheckinEntity>, token: string): Promise<any> {
    const record = {
      usuario_id: data.usuario_id,
      fecha: new Date().toISOString(),
      emocion: data.emocion,
      consumo: data.consumo,
      gratitud: data.gratitud,
      ubicacion: data.ubicacion ?? null,
      social: data.social ?? null,
      reflexion: data.reflexion ?? null,
    };
    return await this.dbService.insert('registro_diario', [record], token);
  }

  async updateSobrietyDate(usuarioId: string, masterToken: string): Promise<void> {
    const now = new Date().toISOString();
    await this.dbService.update(
      'sobriedad',
      'usuario_id',
      usuarioId,
      { fecha_ultimo_consumo: now, updated_at: now },
      masterToken,
    );
  }

  async getGratitudeHistory(usuarioId: string, token: string): Promise<GratitudeEntryResult[]> {
    const result = await this.dbService.find('registro_diario', { usuario_id: usuarioId }, token);
    const rows = Array.isArray(result) ? result : (result.rows ?? []);

    return rows.map((row: any) => {
      const fecha = new Date(row.fecha);
      return {
        dia: fecha.toISOString().split('T')[0],
        hora: fecha.toTimeString().split(' ')[0].slice(0, 5),
        gratitud: row.gratitud,
      };
    });
  }

  async getCamino(usuarioId: string, masterToken: string): Promise<CaminoEntity | null> {
    const result = await this.dbService.find('camino', { usuario_id: usuarioId }, masterToken);
    const rows = Array.isArray(result) ? result : (result.rows ?? []);
    return rows[0] ?? null;
  }

  async upsertCamino(data: Partial<CaminoEntity>, masterToken: string): Promise<void> {
    const now = new Date().toISOString();

    if (data._id) {
      await this.dbService.update(
        'camino',
        'usuario_id',
        data.usuario_id,
        { nivel: data.nivel, subnivel: data.subnivel, updated_at: now },
        masterToken,
      );
    } else {
      await this.dbService.insert('camino', [{
        usuario_id: data.usuario_id,
        nivel: 1,
        subnivel: 1,
        updated_at: now,
      }], masterToken);
    }
  }

  async getAllCheckins(usuarioId: string, token: string): Promise<any[]> {
    const result = await this.dbService.find('registro_diario', { usuario_id: usuarioId }, token);
    return Array.isArray(result) ? result : ((result as any)?.rows ?? []);
  }

  async getTodayCheckin(usuarioId: string, token: string): Promise<any | null> {
    const result = await this.dbService.find('registro_diario', { usuario_id: usuarioId }, token);
    const rows: any[] = Array.isArray(result) ? result : ((result as any)?.rows ?? []);
    const today = new Date().toISOString().split('T')[0];
    return rows.find((r: any) => r.fecha?.toString().startsWith(today)) ?? null;
  }

  async updateTodayCheckin(id: string, data: Partial<DailyCheckinEntity>, token: string): Promise<any> {
    return await this.dbService.update(
      'registro_diario',
      '_id',
      id,
      {
        emocion: data.emocion,
        consumo: data.consumo,
        gratitud: data.gratitud,
        ubicacion: data.ubicacion ?? null,
        social: data.social ?? null,
        reflexion: data.reflexion ?? null,
      },
      token,
    );
  }

  async getMonthCheckins(usuarioId: string, month: number, year: number, token: string): Promise<any[]> {
    const result = await this.dbService.find('registro_diario', { usuario_id: usuarioId }, token);
    const rows: any[] = Array.isArray(result) ? result : ((result as any)?.rows ?? []);

    return rows.filter((r: any) => {
      const fecha = new Date(r.fecha);
      return fecha.getMonth() + 1 === month && fecha.getFullYear() === year;
    });
  }
}