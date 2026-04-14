import api from './axios';

export interface Member {
  id: string;
  usuario_id: string;
  tipo_acceso: 'SOLO_VER' | 'POSTEAR_COMENTAR' | 'CHAT_COMPLETO';
  es_moderador: boolean;
  joined_at: string | undefined;
}

export interface MemberEnriched extends Member {
  nombre?: string;
  email?: string;
  estado?: string;
}

export interface Community {
  id: string;
  nombre: string;
  descripcion: string | null;
  activa: boolean;
  created_at: string | undefined;
  creado_por: string;
  creado_por_nombre?: string;
  total_miembros?: number;
  total_moderadores?: number;
  miembros?: MemberEnriched[];
}


export interface MemberWithUser extends Member {
  nombre?: string;
  email?: string;
  estado?: string;
}

export async function getCommunities(): Promise<Community[]> {
  const res = await api.get<Community[]>('/api/web/admin/communities');
  return res.data;
}

export async function getCommunity(id: string): Promise<Community> {
  const res = await api.get<Community>(`/api/web/admin/communities/${id}`);
  return res.data;
}

export async function createCommunity(data: { nombre: string; descripcion?: string }): Promise<Community> {
  const res = await api.post<Community>('/api/web/admin/communities', data);
  return res.data;
}

export async function updateCommunity(
  id: string,
  data: { nombre?: string; descripcion?: string; activa?: boolean }
): Promise<Community> {
  const res = await api.patch<Community>(`/api/web/admin/communities/${id}`, data);
  return res.data;
}

export async function deleteCommunity(id: string): Promise<void> {
  await api.delete(`/api/web/admin/communities/${id}`);
}

export async function addMember(
  communityId: string,
  data: { email: string; tipoAcceso: string; esModerador: boolean }
): Promise<Member> {
  const res = await api.post<Member>(`/api/web/admin/communities/${communityId}/members`, data);
  return res.data;
}

export async function removeMember(communityId: string, usuarioId: string): Promise<void> {
  await api.delete(`/api/web/admin/communities/${communityId}/members/${usuarioId}`);
}

export async function changeMemberAccess(
  communityId: string,
  usuarioId: string,
  tipoAcceso: string
): Promise<Member> {
  const res = await api.patch<Member>(
    `/api/web/admin/communities/${communityId}/members/${usuarioId}/access`,
    { tipoAcceso }
  );
  return res.data;
}

export async function changeMemberModerator(
  communityId: string,
  usuarioId: string,
  esModerador: boolean
): Promise<Member> {
  const res = await api.patch<Member>(
    `/api/web/admin/communities/${communityId}/members/${usuarioId}/moderator`,
    { esModerador }
  );
  return res.data;
}