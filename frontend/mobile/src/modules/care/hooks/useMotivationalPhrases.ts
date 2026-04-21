import { useState, useCallback } from 'react';
import {
  getFrasesPorFecha,
  guardarFraseMotivacional,
  desguardarFraseMotivacional,
} from '../services/motivationalService';

export interface Frase {
  _id?: string;
  frase_id: string;
  frase: string;
  dia: string;
  isFavorite?: boolean;
}

export const useMotivationalPhrases = () => {
  const [frases, setFrases] = useState<Frase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // ✅ Cargar frases por fecha
  const fetchFrasesPorFecha = useCallback(async (fecha: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFrasesPorFecha(fecha);
      console.log('📜 Frases obtenidas:', data);
      setFrases(data || []);
      setSelectedDate(fecha);
    } catch (err: any) {
      setError(err.message || 'Error obteniendo frases');
      console.error('❌ Error fetchFrasesPorFecha:', err);
      setFrases([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Toggle favorito
  const toggleFavorito = useCallback(
    async (fraseId: string) => {
      try {
        setError(null);
        const isFavorite = frases.some((f) => f.frase_id === fraseId && f.isFavorite);

        if (isFavorite) {
          // Remover de favoritas
          setFrases((prev) =>
            prev.map((f) =>
              f.frase_id === fraseId ? { ...f, isFavorite: false } : f
            )
          );
          await desguardarFraseMotivacional(fraseId);
        } else {
          // Agregar a favoritas
          setFrases((prev) =>
            prev.map((f) =>
              f.frase_id === fraseId ? { ...f, isFavorite: true } : f
            )
          );
          await guardarFraseMotivacional(fraseId);
        }
      } catch (err: any) {
        setError(err.message || 'Error actualizando favorito');
        console.error('❌ Error toggleFavorito:', err);
        // Refetch para sincronizar
        await fetchFrasesPorFecha(selectedDate);
      }
    },
    [frases, selectedDate, fetchFrasesPorFecha]
  );

  return {
    frases,
    loading,
    error,
    selectedDate,
    fetchFrasesPorFecha,
    toggleFavorito,
    setSelectedDate,
  };
};