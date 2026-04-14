import api from './axios'
 
export interface BanRequest {
  _id: string
  usuario_id: string
  moderador_id: string
  comunidad_id: string
  motivo: string
  estado: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA'
  created_at?: string
}
 
export interface BanRequestEnriched extends BanRequest {
  userName?: string
  userEmail?: string
  moderatorName?: string
  moderatorEmail?: string
  communityName?: string
}
 
export async function getBanRequests(soloPendientes = true): Promise<BanRequest[]> {
  const res = await api.get<BanRequest[]>('/api/web/admin/ban-requests', {
    params: { soloPendientes },
  })
  return res.data
}
 
export async function resolveBanRequest(
  id: string,
  estado: 'APROBADA' | 'RECHAZADA'
): Promise<void> {
  await api.patch(`/api/web/admin/ban-requests/${id}`, { estado })
}
