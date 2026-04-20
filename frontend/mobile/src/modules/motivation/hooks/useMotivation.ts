import { useState, useCallback } from 'react';
import {
  getFraseDia,
  getFrasesGuardadas,
  guardarFrase,
  desguardarFrase,
  getMisChallenges,
  joinChallenge,
  getMisMedallas,
} from '../../../services/motivationService';
import { FraseDia, UserChallenge, Medal } from '../types/motivation';

export const useMotivation = () => {
  const [fraseDia, setFraseDia] = useState<FraseDia | null>(null);
  const [frasesGuardadas, setFrasesGuardadas] = useState<FraseDia[]>([]);
  const [misChallenges, setMisChallenges] = useState<UserChallenge[]>([]);
  const [misMedallas, setMisMedallas] = useState<Medal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ FRASES
  const fetchFraseDia = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const frase = await getFraseDia();
      setFraseDia(frase);
    } catch (err: any) {
      setError(err.message || 'Error obteniendo frase del día');
      console.error('❌ Error fetchFraseDia:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFrasesGuardadas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const frases = await getFrasesGuardadas();
      setFrasesGuardadas(frases);
    } catch (err: any) {
      setError(err.message || 'Error obteniendo frases guardadas');
      console.error('❌ Error fetchFrasesGuardadas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleFraseFavorita = useCallback(
    async (fraseId: string) => {
      try {
        setError(null);
        const isFavorite = frasesGuardadas.some((f) => f.frase_id === fraseId);

        if (isFavorite) {
          await desguardarFrase(fraseId);
          setFrasesGuardadas((prev) => prev.filter((f) => f.frase_id !== fraseId));
          if (fraseDia?.frase_id === fraseId) {
            setFraseDia((prev) =>
              prev ? { ...prev, isFavorite: false } : null
            );
          }
        } else {
          await guardarFrase(fraseId);
          await fetchFrasesGuardadas();
          if (fraseDia?.frase_id === fraseId) {
            setFraseDia((prev) =>
              prev ? { ...prev, isFavorite: true } : null
            );
          }
        }
      } catch (err: any) {
        setError(err.message || 'Error actualizando favorita');
        console.error('❌ Error toggleFraseFavorita:', err);
      }
    },
    [frasesGuardadas, fraseDia, fetchFrasesGuardadas]
  );

  // ✅ RETOS
  const fetchMisChallenges = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const challenges = await getMisChallenges();
      setMisChallenges(challenges);
    } catch (err: any) {
      setError(err.message || 'Error obteniendo retos');
      console.error('❌ Error fetchMisChallenges:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleJoinChallenge = useCallback(async (retoId: string) => {
    try {
      setError(null);
      const newChallenge = await joinChallenge(retoId);
      setMisChallenges((prev) => [...prev, newChallenge]);
    } catch (err: any) {
      setError(err.message || 'Error uniéndose al reto');
      console.error('❌ Error joinChallenge:', err);
    }
  }, []);

  // ✅ MEDALLAS
  const fetchMisMedallas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const medallas = await getMisMedallas();
      setMisMedallas(medallas);
    } catch (err: any) {
      setError(err.message || 'Error obteniendo medallas');
      console.error('❌ Error fetchMisMedallas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fraseDia,
    frasesGuardadas,
    misChallenges,
    misMedallas,
    loading,
    error,
    fetchFraseDia,
    fetchFrasesGuardadas,
    toggleFraseFavorita,
    fetchMisChallenges,
    handleJoinChallenge,
    fetchMisMedallas,
  };
};