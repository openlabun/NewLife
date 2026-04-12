import { FraseDia, FraseGuardada } from '../entities/frase-dia.entity';

export interface IFraseDiaProviderPort {
  getFraseDelDia(fecha: string): Promise<FraseDia | null>;
  getFraseById(id: string): Promise<FraseDia | null>;
  getAllFrases(): Promise<FraseDia[]>;
}

export interface IFraseGuardadaProviderPort {
  getFrasesGuardadas(usuarioId: string): Promise<FraseGuardada[]>;
  guardarFrase(usuarioId: string, fraseId: string): Promise<FraseGuardada>;
  desguardarFrase(usuarioId: string, fraseId: string): Promise<void>;
  isFraseGuardada(usuarioId: string, fraseId: string): Promise<boolean>;
}

export const IFRASE_DIA_PROVIDER_PORT = 'IFRASE_DIA_PROVIDER_PORT';
export const IFRASE_GUARDADA_PROVIDER_PORT = 'IFRASE_GUARDADA_PROVIDER_PORT';
