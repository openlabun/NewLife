import api from './axios';

export interface User {
  id: string;
  usuario_id: string;
  email: string;
  nombre: string;
  rol: 'USUARIO' | 'MODERADOR' | 'ADMIN' | 'SUPERADMIN';
  estado: 'ACTIVO' | 'SUSPENDIDO' | 'BANEADO' | 'ELIMINADO';
  suspension_hasta: string | null;
  created_at: string | undefined;
  last_login: string | undefined;
}

export async function getUsers(filters?: { rol?: string; estado?: string }): Promise<User[]> {
  const params: Record<string, string> = {};
  if (filters?.rol && filters.rol !== 'all') params.rol = filters.rol;
  if (filters?.estado && filters.estado !== 'all') params.estado = filters.estado;
  const res = await api.get<User[]>('/api/web/admin/users', { params });
  return res.data;
}

export async function changeUserRole(userId: string, rol: string): Promise<User> {
  const res = await api.patch<User>(`/api/web/admin/users/${userId}/rol`, { rol });
  return res.data;
}

export async function changeUserStatus(
  userId: string,
  estado: string,
  dias?: number,
): Promise<User> {
  const body: Record<string, unknown> = { estado };
  if (estado === 'SUSPENDIDO' && dias) body.dias = dias;
  const res = await api.patch<User>(`/api/web/admin/users/${userId}/estado`, body);
  return res.data;
}

export async function createAdmin(data: {
  email: string;
  password: string;
  nombre: string;
}): Promise<User> {
  const res = await api.post<User>('/api/web/admin/users/admin', data);
  return res.data;
}