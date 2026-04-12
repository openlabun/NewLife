import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service'; // <-- 3 niveles
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service'; // <-- 3 niveles
import { FraseDia, FraseGuardada } from '../../domain/entities/frase-dia.entity'; // <-- 2 niveles
import { IFraseDiaProviderPort, IFraseGuardadaProviderPort } from '../../domain/ports/frase-dia.port';

const FRASES_GUARDADAS_TABLE = 'frases_guardadas';

@Injectable()
export class RobleFraseGuardadaAdapter implements IFraseGuardadaProviderPort {
  constructor(
    private readonly db: DatabaseService,
    private readonly systemAuth: SystemAuthService,
  ) {}

  private mapFraseGuardada(row: Record<string, unknown>): FraseGuardada {
    return new FraseGuardada({
      _id: row._id as string,
      usuario_id: row.usuario_id as string,
      frase_id: row.frase_id as string,
    });
  }

  async getFrasesGuardadas(usuarioId: string): Promise<FraseGuardada[]> {
    const token = await this.systemAuth.getMasterToken();
    const result = await this.db.find(
      FRASES_GUARDADAS_TABLE,
      { usuario_id: usuarioId },
      token,
    );

    if (!result || !Array.isArray(result)) {
      return [];
    }

    return result.map((row: Record<string, unknown>) =>
      this.mapFraseGuardada(row),
    );
  }

  async guardarFrase(usuarioId: string, fraseId: string): Promise<FraseGuardada> {
    const token = await this.systemAuth.getMasterToken();
    const result = await this.db.insert(
      FRASES_GUARDADAS_TABLE,
      [
        {
          usuario_id: usuarioId,
          frase_id: fraseId,
        },
      ],
      token,
    );

    if (!result || !result.inserted || result.inserted.length === 0) {
      throw new Error('No se pudo guardar la frase');
    }

    return this.mapFraseGuardada(result.inserted[0] as Record<string, unknown>);
  }

  async desguardarFrase(usuarioId: string, fraseId: string): Promise<void> {
    const token = await this.systemAuth.getMasterToken();

    const result = await this.db.find(
      FRASES_GUARDADAS_TABLE,
      { usuario_id: usuarioId, frase_id: fraseId },
      token,
    );

    if (!result || !Array.isArray(result) || result.length === 0) {
      throw new Error('La frase no está guardada');
    }

    const recordId = (result[0] as Record<string, unknown>)._id as string;
    await this.db.delete(FRASES_GUARDADAS_TABLE, '_id', recordId, token);
  }

  async isFraseGuardada(usuarioId: string, fraseId: string): Promise<boolean> {
    const token = await this.systemAuth.getMasterToken();
    const result = await this.db.find(
      FRASES_GUARDADAS_TABLE,
      { usuario_id: usuarioId, frase_id: fraseId },
      token,
    );

    return !!(result && Array.isArray(result) && result.length > 0);
  }
}