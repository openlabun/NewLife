import { DailyCheckinEntity } from '../entities/daily-checkin.entity';
import { CaminoEntity } from '../entities/camino.entity';

export interface GratitudeEntryResult {
  dia: string;
  hora: string;
  gratitud: string;
}

export interface IProgressProviderPort {
  createDailyCheckin(data: Partial<DailyCheckinEntity>, token: string): Promise<any>;
  updateSobrietyDate(usuarioId: string, masterToken: string): Promise<void>;
  getGratitudeHistory(usuarioId: string, token: string): Promise<GratitudeEntryResult[]>;
  getCamino(usuarioId: string, masterToken: string): Promise<CaminoEntity | null>;
  upsertCamino(data: Partial<CaminoEntity>, masterToken: string): Promise<void>;
  getAllCheckins(usuarioId: string, token: string): Promise<any[]>;
  getTodayCheckin(usuarioId: string, token: string): Promise<any | null>;
  updateTodayCheckin(id: string, data: Partial<DailyCheckinEntity>, token: string): Promise<any>;
  getMonthCheckins(usuarioId: string, month: number, year: number, token: string): Promise<any[]>;
}