import { useState, useEffect, useCallback } from 'react';
import {
  contentService,
  ContenidoFrontend,
} from '../services/contentService';

export const useContent = () => {
  const [contenido, setContenido] = useState<ContenidoFrontend[]>([]);
  const [favoritos, setFavoritos] = useState<ContenidoFrontend[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ CARGAR TODO EL CONTENIDO
  const fetchContenido = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contentService.getContenido();
      setContenido(data);
    } catch (err: any) {
      setError(err.message || 'Error obteniendo contenido');
      console.error('❌ Error fetchContenido:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ CARGAR FAVORITOS
  const fetchFavoritos = useCallback(async () => {
    try {
      const data = await contentService.getFavoritos();
      setFavoritos(data);
    } catch (err: any) {
      setError(err.message || 'Error obteniendo favoritos');
      console.error('❌ Error fetchFavoritos:', err);
    }
  }, []);

  // ✅ TOGGLE FAVORITO
  const toggleFavorito = useCallback(
    async (contenidoId: string) => {
      try {
        setError(null);
        
        // Verificar si está en favoritos
        const isFavorite = contenido.some((c) => c.id === contenidoId && c.liked);
        
        if (isFavorite) {
          // Eliminar de favoritos
          setContenido((prev) =>
            prev.map((c) =>
              c.id === contenidoId ? { ...c, liked: false } : c
            )
          );
          setFavoritos((prev) => prev.filter((f) => f.id !== contenidoId));
          
          await contentService.removeFavorito(contenidoId);
        } else {
          // Agregar a favoritos
          setContenido((prev) =>
            prev.map((c) =>
              c.id === contenidoId ? { ...c, liked: true } : c
            )
          );
          
          const item = contenido.find((c) => c.id === contenidoId);
          if (item) {
            setFavoritos((prev) => [...prev, { ...item, liked: true }]);
          }
          
          await contentService.addFavorito(contenidoId);
        }
      } catch (err: any) {
        setError(err.message || 'Error al actualizar favorito');
        console.error('❌ Error toggleFavorito:', err);
        // Refetch para sincronizar
        await fetchContenido();
        await fetchFavoritos();
      }
    },
    [contenido, fetchContenido, fetchFavoritos]
  );

  // ✅ CARGAR AL MONTAR
  useEffect(() => {
    fetchContenido();
    fetchFavoritos();
  }, [fetchContenido, fetchFavoritos]);

  // ✅ AGRUPAR POR CATEGORÍA
  const groupByCategory = useCallback((): Record<string, ContenidoFrontend[]> => {
    return contenido.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, ContenidoFrontend[]>);
  }, [contenido]);

  // ✅ OBTENER MÁS LEÍDO
  const getMostRead = useCallback((): ContenidoFrontend[] => {
    return contenido.slice(0, 3);
  }, [contenido]);

  return {
    contenido,
    favoritos,
    loading,
    error,
    fetchContenido,
    fetchFavoritos,
    toggleFavorito,
    groupByCategory,
    getMostRead,
  };
};