import { Injectable } from '@nestjs/common';
import { IProgressProviderPort } from '../../domain/ports/progress-provider.port';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { CaminoEntity } from '../../domain/entities/camino.entity';

@Injectable()
export class ProgressProvider implements IProgressProviderPort {
  constructor(private readonly dbService: DatabaseService) {}

  async getCamino(usuarioId: string, token: string): Promise<CaminoEntity | null> {
    const res = await this.dbService.find(
      'camino',
      { usuario_id: usuarioId },
      token
    );

    const rows = Array.isArray(res) ? res : (res?.rows ?? []);
    return rows[0] || null;
  }

  async createDailyCheckin(): Promise<any> {
    throw new Error('Not implemented');
  }

  async updateSobrietyDate(): Promise<void> {
    throw new Error('Not implemented');
  }

  async getGratitudeHistory(): Promise<any[]> {
    throw new Error('Not implemented');
  }

  async upsertCamino(): Promise<void> {
    throw new Error('Not implemented');
  }

  async getAllCheckins(): Promise<any[]> {
    throw new Error('Not implemented');
  }

  async getTodayCheckin(): Promise<any | null> {
    throw new Error('Not implemented');
  }

  async updateTodayCheckin(): Promise<any> {
    throw new Error('Not implemented');
  }

  async getMonthCheckins(): Promise<any[]> {
    throw new Error('Not implemented');
  }
}