import api from '../../../services/api';

/**
 * Obtiene todas las frases hasta una fecha específica
 * Retorna todas las frases creadas antes o igual a esa fecha
 */
export const getFrasesPorFecha = async (fecha: string) => {
  try {
    const response = await api.get(`/motivation/frases?hasta=${fecha}`);
    // ✅ El backend retorna { data: [...] }
    if (response.data?.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return [];
  } catch (error: any) {
    console.error('❌ Error obteniendo frases por fecha:', error.message);
    throw error;
  }
};

/**
 * Guarda una frase en favoritas
 */
export const guardarFraseMotivacional = async (fraseId: string) => {
  try {
    await api.post('/motivation/frases-guardadas', { frase_id: fraseId });
    console.log('✅ Frase guardada como favorita');
  } catch (error: any) {
    console.error('❌ Error guardando frase:', error.message);
    throw error;
  }
};

/**
 * Elimina una frase de favoritas
 */
export const desguardarFraseMotivacional = async (fraseId: string) => {
  try {
    await api.delete(`/motivation/frases-guardadas/${fraseId}`);
    console.log('✅ Frase removida de favoritas');
  } catch (error: any) {
    console.error('❌ Error removiendo favorita:', error.message);
    throw error;
  }
};