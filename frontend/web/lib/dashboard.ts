import api from './axios'
import { getCommunities } from './communities'
import { getUsers } from './users'

export interface DashboardMetrics {
  totalUsuarios: number
  comunidadesActivas: number
  suspendidosActivos: number
  baneosPendientes: number
}

export interface BanRequest {
  id: string
  usuario_id: string
  moderador_id: string
  comunidad_id: string
  motivo: string
  estado: string
}

export async function getBanRequests(): Promise<BanRequest[]> {
  const res = await api.get<BanRequest[]>('/api/web/admin/ban-requests')
  return res.data
}

export async function resolveBanRequest(
  id: string,
  estado: 'APROBADA' | 'RECHAZADA'
): Promise<void> {
  await api.patch(`/api/web/admin/ban-requests/${id}`, { estado })
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const [users, communities, banRequests] = await Promise.all([
    getUsers(),
    getCommunities(),
    getBanRequests(),
  ])

  return {
    totalUsuarios:      users.length,
    comunidadesActivas: communities.filter(c => c.activa).length,
    suspendidosActivos: users.filter(u => u.estado === 'SUSPENDIDO').length,
    baneosPendientes:   banRequests.filter(b => b.estado === 'PENDIENTE').length,
  }
}