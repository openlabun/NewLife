import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://10.0.2.2:3000';

// Tokens en memoria para sesiones sin "Recordarme"
export const sessionTokens: { accessToken: string | null; refreshToken: string | null } = {
  accessToken: null,
  refreshToken: null,
};

// Mini event emitter para notificar sesión expirada
type Listener = () => void;
export const authEventEmitter = {
  listeners: new Set<Listener>(),
  emit() { this.listeners.forEach((l) => l()); },
  on(l: Listener): () => void {
    this.listeners.add(l);
    return () => { this.listeners.delete(l); };
  },
};

const api = axios.create({
  baseURL: BASE_URL,
});

let isRefreshing = false;
let pendingRequests: Array<(token: string) => void> = [];

function resolveQueue(newToken: string) {
  pendingRequests.forEach((cb) => cb(newToken));
  pendingRequests = [];
}

async function getAccessToken(): Promise<string | null> {
  if (sessionTokens.accessToken) return sessionTokens.accessToken;
  return AsyncStorage.getItem('accessToken');
}

async function getRefreshToken(): Promise<string | null> {
  if (sessionTokens.refreshToken) return sessionTokens.refreshToken;
  return AsyncStorage.getItem('refreshToken');
}

async function saveNewAccessToken(token: string) {
  const rememberMe = await AsyncStorage.getItem('rememberMe');
  if (rememberMe === 'true') {
    await AsyncStorage.setItem('accessToken', token);
  } else {
    sessionTokens.accessToken = token;
  }
}

// REQUEST INTERCEPTOR
api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        pendingRequests.push((newToken: string) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = await getRefreshToken();

      if (!refreshToken) throw new Error('No hay refresh token');

      const { data } = await axios.post(`${BASE_URL}/auth/refresh-token`, { refreshToken });
      const newAccessToken: string = data.accessToken;

      await saveNewAccessToken(newAccessToken);
      resolveQueue(newAccessToken);

      console.log('✅ Token refrescado correctamente');

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);

    } catch (refreshError) {
      sessionTokens.accessToken = null;
      sessionTokens.refreshToken = null;
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'rememberMe']);
      authEventEmitter.emit();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;