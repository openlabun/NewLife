import api from './axios';

export interface AdminUser {
    id: string;
    email: string;
    nombre: string;
    rol: 'SUPERADMIN' | 'ADMIN';
}

export interface LoginResponse {
    accessToken: string;
    user: AdminUser;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
    const res = await api.post<LoginResponse>('/api/web/auth/login', { email, password });
    return res.data;
}

export async function logout(token: string): Promise<void> {
    await api.post('/api/web/auth/logout');
}

export async function getMe(): Promise<AdminUser> {
    const res = await api.get<AdminUser>('/api/web/auth/me');
    return res.data;
}

export function saveSession(token: string, user: AdminUser): void {
  console.log('Guardando sesión:', { token: token.substring(0, 20) + '...', user });
  localStorage.setItem('admin_token', token);
  localStorage.setItem('admin_user', JSON.stringify(user));
  document.cookie = `admin_token=${token}; path=/; max-age=${8 * 60 * 60}`;
}

export function clearSession(): void {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    document.cookie = 'admin_token=; path=/; max-age=0';
}

export function getStoredToken(): string | null {
    return localStorage.getItem('admin_token');
}

export function getStoredUser(): AdminUser | null {
    const raw = localStorage.getItem('admin_user');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
}