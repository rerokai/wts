// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, setAuthToken } from '@/lib/apiClient';
import type { User } from '../api/backendApi';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await api.api.getMyUserApiUsersMeGet();
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user', error);
      setAuthToken(null);
    } finally {
      setLoading(false);
    }
  };

const login = async (email: string, password: string) => {
  // Просто передаём объект, а не URLSearchParams
  const response = await api.api.loginApiAuthLoginPost({
    username: email,
    password: password,
  });
  const tokens = response.data;
  setAuthToken(tokens.access_token);
  await fetchCurrentUser();
};

  const register = async (email: string, password: string) => {
    await api.api.registerEmployeeApiUsersRegisterPost({ email, password });
    // после регистрации автоматически логиним
    await login(email, password);
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};