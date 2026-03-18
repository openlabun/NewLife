import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

// Login: llama al backend Y siempre guarda tokens
export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  const { accessToken, refreshToken } = response.data;
  await AsyncStorage.multiSet([
    ['accessToken', accessToken],
    ['refreshToken', refreshToken],
    ['userEmail', email], // guardar email para identificar al usuario
  ]);
  return response.data;
};

// Register: crea cuenta y guarda tokens igual
export const registerUser = async (nombre: string, email: string, password: string) => {
  await api.post('/auth/register', { nombre, email, password });
  return loginUser(email, password);
};

export const logoutUser = async () => {
  await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userEmail']);
};

export const getOnboardingStatus = async () => {
  const response = await api.get('/user/onboarding-status');
  return response.data;
};

export const completeProfile = async (data: object) => {
  const response = await api.post('/user/complete-profile', data);
  return response.data;
};

export const createContact = async (nombre: string, telefono: string) => {
  const response = await api.post('/contacts', { nombre, telefono });
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/user/profile');
  return response.data;
};

export const getSobrietyTime = async () => {
  const response = await api.get('/home/sobriety-time');
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