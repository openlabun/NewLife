import api from '../../../services/api';

export interface ContenidoBackend {
  _id: string;
  contenido_id: string;
  titulo: string;
  tipo: 'ARTICULO' | 'VIDEO';
  duracion_minutos: number | null;
  texto_contenido: string;
  categoria_id: string | null;
  autor_nombre: string;
  autor_profesion: string;
  autor_foto: string;
  hashtags: string[];
  estado: string;
  created_at: string;
  updated_at: string;
  imagen_portada: string;
  video_url: string | null;
  is_favorite: boolean;
}

export interface ContenidoFrontend {
  id: string;
  title: string;
  type: 'article' | 'video';
  category: string;
  duration: string;
  image: string;
  liked: boolean;
  tags: string[];
  author?: string;
  authorRole?: string;
  body?: string;
  videoUrl?: string;
  autorFoto?: string;
  createdAt: string;
}

interface ContenidoResponse {
  data: ContenidoBackend[];
}

// Función para convertir tipo backend a frontend
function convertType(tipo: string): 'article' | 'video' {
  return tipo === 'VIDEO' ? 'video' : 'article';
}

// Función para convertir duración a string legible
function formatDuration(tipo: string, duracion: number | null): string {
  if (tipo === 'VIDEO') {
    return duracion ? `${duracion} min de duración` : 'Video';
  }
  return duracion ? `${duracion} min de lectura` : 'Artículo';
}

// Función para mapear categoría desde ID o valor null
function mapCategory(categoria_id: string | null): string {
  if (!categoria_id) return 'Otros';
  
  const categoryMap: Record<string, string> = {
    'relaciones': 'Relaciones',
    'apoyo': 'Apoyo',
    'motivacion': 'Motivación',
    'salud': 'Salud',
    'familia': 'Familia',
    'trabajo': 'Trabajo',
    'tipos-drogas': 'Tipos de drogas',
  };

  return categoryMap[categoria_id.toLowerCase()] || 'Otros';
}

// Convertir de backend a frontend
function convertToFrontend(item: ContenidoBackend): ContenidoFrontend {
  return {
    id: item.contenido_id,
    title: item.titulo,
    type: convertType(item.tipo),
    category: mapCategory(item.categoria_id),
    duration: formatDuration(item.tipo, item.duracion_minutos),
    image: item.imagen_portada,
    liked: item.is_favorite,
    tags: Array.isArray(item.hashtags) ? item.hashtags : [],
    author: item.autor_nombre,
    authorRole: item.autor_profesion,
    body: item.texto_contenido,
    videoUrl: item.video_url || undefined,
    autorFoto: item.autor_foto,
    createdAt: item.created_at,
  };
}

export const contentService = {
  async getContenido(): Promise<ContenidoFrontend[]> {
    try {
      const response = await api.get<ContenidoResponse>('/care/contenido');
      
      if (response.data?.data && Array.isArray(response.data.data)) {
        // Convertir y ordenar por fecha (más reciente primero)
        const converted = response.data.data.map(convertToFrontend);
        return converted.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      
      return [];
    } catch (error: any) {
      console.error('❌ Error obteniendo contenido:', error.message);
      throw error;
    }
  },

  async getFavoritos(): Promise<ContenidoFrontend[]> {
    try {
      const response = await api.get<ContenidoResponse>('/care/contenido/favoritos');
      
      if (response.data?.data && Array.isArray(response.data.data)) {
        const converted = response.data.data.map(convertToFrontend);
        return converted.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      
      return [];
    } catch (error: any) {
      console.error('❌ Error obteniendo favoritos:', error.message);
      throw error;
    }
  },

  async addFavorito(contenidoId: string): Promise<void> {
    try {
      await api.post(`/care/contenido/${contenidoId}/favorito`);
      console.log('✅ Agregado a favoritos');
    } catch (error: any) {
      console.error('❌ Error agregando favorito:', error.message);
      throw error;
    }
  },

  async removeFavorito(contenidoId: string): Promise<void> {
    try {
      await api.delete(`/care/contenido/${contenidoId}/favorito`);
      console.log('✅ Eliminado de favoritos');
    } catch (error: any) {
      console.error('❌ Error eliminando favorito:', error.message);
      throw error;
    }
  },
};