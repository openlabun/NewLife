import api from './api';

// ── Comunidades ───────────────────────────────────────────────────────────────

export const getMyCommunities = async () => {
  const res = await api.get('/communities');
  return res.data;
};

export const getCommunityDetail = async (id: string) => {
  const res = await api.get(`/communities/${id}`);
  return res.data;
};

// ── Posts ─────────────────────────────────────────────────────────────────────

export const getPosts = async (communityId: string) => {
  const res = await api.get(`/communities/${communityId}/posts`);
  return res.data;
};

export const createPost = async (communityId: string, contenido: string, titulo?: string) => {
  const res = await api.post(`/communities/${communityId}/posts`, { contenido, titulo });
  return res.data;
};

export const deletePost = async (communityId: string, postId: string) => {
  const res = await api.delete(`/communities/${communityId}/posts/${postId}`);
  return res.data;
};

// ── Comentarios ───────────────────────────────────────────────────────────────

export const getComments = async (communityId: string, postId: string) => {
  const res = await api.get(`/communities/${communityId}/posts/${postId}/comments`);
  return res.data;
};

export const createComment = async (communityId: string, postId: string, contenido: string) => {
  const res = await api.post(`/communities/${communityId}/posts/${postId}/comments`, { contenido });
  return res.data;
};

export const deleteComment = async (communityId: string, postId: string, commentId: string) => {
  const res = await api.delete(`/communities/${communityId}/posts/${postId}/comments/${commentId}`);
  return res.data;
};

// ── Reacciones ────────────────────────────────────────────────────────────────

export const reactToPost = async (communityId: string, postId: string, tipo: string) => {
  const res = await api.post(`/communities/${communityId}/posts/${postId}/reactions`, { tipo });
  return res.data;
};

// ── Foros ─────────────────────────────────────────────────────────────────────

export const getForums = async (communityId: string) => {
  const res = await api.get(`/communities/${communityId}/forums`);
  return res.data;
};

export const getForumDetail = async (communityId: string, forumId: string) => {
  const res = await api.get(`/communities/${communityId}/forums/${forumId}`);
  return res.data;
};

export const replyForum = async (communityId: string, forumId: string, contenido: string) => {
  const res = await api.post(`/communities/${communityId}/forums/${forumId}/replies`, { contenido });
  return res.data;
};

// ── Moderador ─────────────────────────────────────────────────────────────────

export const getMembers = async (communityId: string) => {
  const res = await api.get(`/communities/${communityId}/members`);
  return res.data;
};

export const changeMemberAccess = async (
  communityId: string,
  uid: string,
  tipoAcceso: string,
) => {
  const res = await api.patch(`/communities/${communityId}/members/${uid}/access`, { tipoAcceso });
  return res.data;
};

export const suspendMember = async (communityId: string, uid: string, dias: number) => {
  const res = await api.post(`/communities/${communityId}/members/${uid}/suspend`, { dias });
  return res.data;
};

export const requestBan = async (communityId: string, usuario_id: string, motivo: string) => {
  const res = await api.post(`/communities/${communityId}/ban-requests`, { usuario_id, motivo });
  return res.data;
};

export const addMember = async (
  communityId: string,
  email: string,
  tipoAcceso: string = 'POSTEAR_COMENTAR',
) => {
  const res = await api.post(`/communities/${communityId}/members`, { email, tipoAcceso });
  return res.data;
};

export const removeMember = async (communityId: string, uid: string) => {
  const res = await api.delete(`/communities/${communityId}/members/${uid}`);
  return res.data;
};