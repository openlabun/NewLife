export interface FraseDia {
  _id?: string;
  frase_id: string;
  frase: string;
  dia?: string;
  isFavorite?: boolean;
  usuario_id?: string;
}

export interface UserChallenge {
  reto_id: string;
  titulo: string;
  descripcion: string;
  dificultad: 'SUAVE' | 'MODERADA' | 'INTENSA';
  tipo: 'SOBRIETY_DAYS' | 'CHECKIN_STREAK' | 'CHECKIN_TOTAL' | 'PATH_LEVEL';
  target: number;
  progreso_actual?: number;
  estado?: 'ACTIVE' | 'COMPLETED' | 'PENDING';
  texto_progreso?: string;
  user_reto_id?: string;
  fecha_inicio?: string;
  fecha_completado?: string | null;
}

export interface Medal {
  _id?: string;
  reto_id: string;
  titulo: string;
  descripcion: string;
  fecha_obtenida?: string;
}

export interface MotivationContextType {
  fraseDia: FraseDia | null;
  frasesGuardadas: FraseDia[];
  misChallenges: {
    activos: UserChallenge[];
    disponibles: UserChallenge[];
    terminados: UserChallenge[];
  };
  misMedallas: Medal[];
  loading: boolean;
  error: string | null;
  fetchFraseDia: () => Promise<void>;
  fetchFrasesGuardadas: () => Promise<void>;
  toggleFraseFavorita: (fraseId: string) => Promise<void>;
  fetchMisChallenges: () => Promise<void>;
  handleJoinChallenge: (retoId: string) => Promise<void>;
  fetchMisMedallas: () => Promise<void>;
}