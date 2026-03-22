'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminUser, getStoredToken, getStoredUser, clearSession } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isLoading: boolean;
  setSession: (token: string, user: AdminUser) => void;
  logout: () => void;
  isSuperAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<AdminUser | null>(null);
  const [token, setToken]     = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Al montar, recuperar sesión del localStorage
    const storedToken = getStoredToken();
    const storedUser  = getStoredUser();
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const setSession = (newToken: string, newUser: AdminUser) => {
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    clearSession();
    setToken(null);
    setUser(null);
    router.push('/admin/login');
  };

  const isSuperAdmin = () => user?.rol === 'SUPERADMIN';

  return (
    <AuthContext.Provider value={{ user, token, isLoading, setSession, logout, isSuperAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}