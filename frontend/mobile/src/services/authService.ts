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
  const response = await api.post('/auth/login', {
    email,
    password,
  });
  return response.data;
};