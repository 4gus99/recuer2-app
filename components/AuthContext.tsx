"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  loggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('loggedIn') : null;
    setLoggedIn(stored === 'true');
  }, []);

  const login = (email: string, password: string) => {
    // Credenciales: amor@amor.com / amor
    if (email === 'amor@amor.com' && password === 'amor') {
      localStorage.setItem('loggedIn', 'true');
      setLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
  };

  return <AuthContext.Provider value={{ loggedIn, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
