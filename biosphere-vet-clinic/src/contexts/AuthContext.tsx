import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  is_admin?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      setToken(t);
      fetchUser(t).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (overrideToken?: string) => {
    const t = overrideToken || token;
    if (!t) return;
    try {
      const res = await fetch(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      }
    } catch {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    const res = await fetch(`${API_URL}/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ username: email, password }),
    });
    if (!res.ok) throw new Error('Неверный email или пароль');
    const data = await res.json();
    setToken(data.access_token);
    localStorage.setItem('token', data.access_token);
    await fetchUser(data.access_token);
    setLoading(false);
  };

  const register = async (name: string, email: string, phone: string, password: string) => {
    setLoading(true);
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password }),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error('Ошибка регистрации: ' + errorText);
    }
    await login(email, password);
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}; 
