export class DailyCheckinEntity {
  _id: string;
  usuario_id: string;
  fecha: string;
  emocion: string;
  consumo: boolean;
  gratitud: string;
  ubicacion: string | null;
  social: string | null;
  reflexion: string | null;
}