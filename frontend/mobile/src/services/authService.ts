import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
import { getGuestDataForMigration, clearGuestData } from './guestService';

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  const { accessToken, refreshToken } = response.data;
  await AsyncStorage.multiSet([
    ['accessToken', accessToken],
    ['refreshToken', refreshToken],
    ['userEmail', email],
  ]);
  return response.data;
};

export const registerUser = async (nombre: string, email: string, password: string) => {
  await api.post('/auth/register', { nombre, email, password });
  return loginUser(email, password);
};

export const logoutUser = async () => {
  await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userEmail']);
};

// ─── Migración de invitado ────────────────────────────────────────────────────

export const migrateGuestToUser = async (): Promise<void> => {
  try {
    const guestData = await getGuestDataForMigration();

    // Solo migrar si hay datos reales
    if (!guestData.guestId) return;

    await api.post('/auth/migrate-guest', guestData);
    await clearGuestData();

    console.log('✅ Migración de invitado exitosa');
  } catch (e) {
    console.log('❌ Error en migración:', e);
    throw e; // propagar para que el caller pueda manejar el error
  }
};

// ─── User ─────────────────────────────────────────────────────────────────────

export const getOnboardingStatus = async () => {
  const response = await api.get('/user/onboarding-status');
  return response.data;
};

export const completeProfile = async (data: object) => {
  const response = await api.post('/user/complete-profile', data);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/user/profile');
  return response.data;
};

export const getSobrietyTime = async () => {
  const res = await api.get('/home/sobriety-time');
  return res.data;
};

export const getSobrietyTimeById = async (robleId: string) => {
  const res = await api.get(`/user/${robleId}/sobriety-time-by-id`);
  return res.data;
};

export const getCamino = async () => {
  const res = await api.get('/progress/camino');
  return res.data;
};

export const getCaminoById = async (robleId: string) => {
  const res = await api.get(`/user/by-id/${robleId}/camino`);
  return res.data;
};

// ─── Contactos ────────────────────────────────────────────────────────────────

export const createContact = async (nombre: string, telefono: string) => {
  const response = await api.post('/contacts', { nombre, telefono });
  return response.data;
};

export const getContacts = async () => {
  const response = await api.get('/contacts');
  return response.data;
};

export const updateContact = async (id: string, nombre: string, telefono: string) => {
  const response = await api.patch(`/contacts/${id}`, { nombre, telefono });
  return response.data;
};

export const deleteContact = async (id: string) => {
  const response = await api.delete(`/contacts/${id}`);
  return response.data;
};

