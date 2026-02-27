import { createContext, useContext, useMemo, useState } from 'react';
import { request } from '../api/http';
import type { AuthState, User } from '../types';

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setAuth: (user: User | null, token: string | null) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const initialUser = localStorage.getItem('user');
const initialToken = localStorage.getItem('accessToken');

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(initialUser ? JSON.parse(initialUser) : null);
  const [accessToken, setAccessToken] = useState<string | null>(initialToken || null);

  const setAuth = (nextUser: User | null, token: string | null) => {
    setUser(nextUser);
    setAccessToken(token);
    if (nextUser) localStorage.setItem('user', JSON.stringify(nextUser));
    else localStorage.removeItem('user');
    if (token) localStorage.setItem('accessToken', token);
    else localStorage.removeItem('accessToken');
  };

  const login = async (email: string, password: string) => {
    const data = await request<{ user: User; accessToken: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setAuth(data.user, data.accessToken);
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await request<{ user: User; accessToken: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    setAuth(data.user, data.accessToken);
  };

  const logout = async () => {
    await request('/auth/logout', { method: 'POST', body: JSON.stringify({}) }, accessToken);
    setAuth(null, null);
  };

  const value = useMemo(() => ({ user, accessToken, login, register, logout, setAuth }), [user, accessToken]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
