import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000',
});

// Agrega el accessToken en cada petición automáticamente
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Si hay 401, refresca el token y reintenta
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const response = await axios.post('http://10.0.2.2:3000/auth/refresh-token', {
          refreshToken,
        });

        const { accessToken } = response.data;
        await AsyncStorage.setItem('accessToken', accessToken);
        console.log('Nuevo accessToken obtenido:', accessToken); // log temporal

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
      }
    }

    return Promise.reject(error);
  }
);

export default api;