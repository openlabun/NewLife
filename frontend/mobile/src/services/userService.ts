import api from './api';

export const getProfile = async () => {
  const res = await api.get('/user/profile');
  return res.data;
};

export const getProfileById = async (robleId: string) => {
  const res = await api.get(`/user/${robleId}/profile`);
  return res.data;
};
