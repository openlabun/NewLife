import api from './axios';

export interface FraseBackend {
    id?: string | number;
    dia: string;
    frase: string;
    fecha_creacion?: string;
}

// Obtener todas las frases
export async function getFrases(): Promise<FraseBackend[]> {
    const res = await api.get('/api/web/admin/frases-dia');
    return res.data;
}

// Crear una frase
export async function createFrase(dia: string, frase: string): Promise<FraseBackend> {
    const res = await api.post('/api/web/admin/frases-dia', { dia, frase });
    return res.data;
}

// Actualizar una frase
export async function updateFrase(diaActual: string, diaNuevo: string, frase: string): Promise<FraseBackend> {
    const res = await api.patch(`/api/web/admin/frases-dia/fecha/${diaActual}`, { 
        dia: diaNuevo, 
        frase 
    });
    return res.data;
}