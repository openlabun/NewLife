export interface FraseDia {
  _id: string;
  frase_id: string;
  frase: string;
  dia: string;
  fecha_actualiz?: string;
  isFavorite?: boolean;
}

export interface FraseGuardada {
  _id: string;
  usuario_id: string;
  frase_id: string;
}

export interface Challenge {
  reto_id: string;
  titulo: string;
  descripcion: string;
  dificultad: 'SUAVE' | 'MODERADA' | 'INTENSA';
  tipo: 'SOBRIETY_DAYS' | 'CHECKIN_STREAK' | 'CHECKIN_TOTAL' | 'PATH_LEVEL';
  target: number;
  estado: 'DRAFT' | 'PUBLISHED';
}

export interface UserChallenge {
  reto_id: string;
  usuario_id: string;
  titulo: string;
  descripcion: string;
  dificultad: 'SUAVE' | 'MODERADA' | 'INTENSA';
  tipo: 'SOBRIETY_DAYS' | 'CHECKIN_STREAK' | 'CHECKIN_TOTAL' | 'PATH_LEVEL';
  target: number;
  progreso: number;
  estado: 'IN_PROGRESS' | 'COMPLETED';
  fecha_inscripcion: string;
  fecha_completado?: string;
}

export interface Medal {
  reto_id: string;
  titulo: string;
  descripcion: string;
  dificultad: 'SUAVE' | 'MODERADA' | 'INTENSA';
  fecha_completado: string;
}