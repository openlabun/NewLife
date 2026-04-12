import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service'; // <-- 3 niveles
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service'; // <-- 3 niveles
import { FraseDia, FraseGuardada } from '../../domain/entities/frase-dia.entity'; // <-- 2 niveles
import { IFraseDiaProviderPort, IFraseGuardadaProviderPort } from '../../domain/ports/frase-dia.port';

const FRASES_DIA_TABLE = 'frases_dia';

@Injectable()
export class RobleFraseDiaAdapter implements IFraseDiaProviderPort {
  constructor(
    private readonly db: DatabaseService,
    private readonly systemAuth: SystemAuthService,
  ) {}

  private mapFraseDia(row: Record<string, unknown>): FraseDia {
    return new FraseDia({
      _id: row._id as string,
      frase_id: row.frase_id as string,
      frase: row.frase as string,
      dia: row.dia as string,
      fecha_actualiz: row.fecha_actualiz as string,
    });
  }

  async getFraseDelDia(fecha: string): Promise<FraseDia | null> {
    const token = await this.systemAuth.getMasterToken();
    const result = await this.db.find(FRASES_DIA_TABLE, { dia: fecha }, token);

    if (!result || !Array.isArray(result) || result.length === 0) {
      return null;
    }

    return this.mapFraseDia(result[0] as Record<string, unknown>);
  }

  async getFraseById(id: string): Promise<FraseDia | null> {
    const token = await this.systemAuth.getMasterToken();
    const result = await this.db.find(FRASES_DIA_TABLE, { frase_id: id }, token);

    if (!result || !Array.isArray(result) || result.length === 0) {
      return null;
    }

    return this.mapFraseDia(result[0] as Record<string, unknown>);
  }

  async getAllFrases(): Promise<FraseDia[]> {
    const token = await this.systemAuth.getMasterToken();
    const result = await this.db.find(FRASES_DIA_TABLE, {}, token);

    if (!result || !Array.isArray(result)) {
      return [];
    }

    return result.map((row: Record<string, unknown>) => this.mapFraseDia(row));
  }
}