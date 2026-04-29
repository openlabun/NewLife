import { FraseDiaEntity, FraseGuardadaEntity } from '../entities/frase.entity';
import { ChallengeEntity } from '../entities/challenge.entity';
import { UserChallengeEntity } from '../entities/user-challenge.entity';

export interface IMotivationProviderPort {
  getFraseDelDia(fecha: string, masterToken: string): Promise<FraseDiaEntity | null>;
  getFraseById(fraseId: string, masterToken: string): Promise<FraseDiaEntity | null>;
  // ✅ NUEVO MÉTODO
  getFrasesPorFecha(fecha: string, masterToken: string): Promise<FraseDiaEntity[]>;
  getFrasesGuardadas(usuarioId: string, userToken: string): Promise<FraseGuardadaEntity[]>;
  isFraseGuardada(usuarioId: string, fraseId: string, userToken: string): Promise<boolean>;
  guardarFrase(usuarioId: string, fraseId: string, userToken: string): Promise<any>;
  desguardarFrase(recordId: string, userToken: string): Promise<any>;
  getPublishedChallenges(token: string): Promise<ChallengeEntity[]>;
  getChallengeById(retoId: string, token: string): Promise<ChallengeEntity | null>;
  getUserChallenges(usuarioId: string, token: string): Promise<UserChallengeEntity[]>;
  getActiveUserChallenges(usuarioId: string, token: string): Promise<UserChallengeEntity[]>;
  startChallenge(data: Partial<UserChallengeEntity>, token: string): Promise<UserChallengeEntity>;
  updateChallengeProgress(userRetoId: string, progreso: number, estado: string, token: string, nuevaFechaInicio?: string): Promise<void>;
}