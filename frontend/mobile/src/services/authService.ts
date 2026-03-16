import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

export const registerUser = async (nombre: string, email: string, password: string) => {
  const response = await api.post('/auth/register', {
    nombre,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  const { accessToken, refreshToken } = response.data;
  await AsyncStorage.setItem('accessToken', accessToken);
  await AsyncStorage.setItem('refreshToken', refreshToken);

  // Log temporal para verificar
  console.log('accessToken guardado:', accessToken);
  console.log('refreshToken guardado:', refreshToken);

  return response.data;
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('refreshToken');
};