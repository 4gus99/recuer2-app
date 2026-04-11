"use client";

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loggedIn) router.push('/');
  }, [loggedIn]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ok = login(password);
    if (ok) {
      router.push('/');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-peach">
      <form onSubmit={handleSubmit} className="glass-panel p-8 max-w-sm w-full">
        <h1 className="mb-6 text-center font-serif text-3xl text-cocoa">Bienvenido</h1>
        {error && <p className="mb-4 text-center text-sm text-red-700">{error}</p>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="mb-4 w-full rounded-lg border border-wine/30 bg-white/70 p-3 text-cocoa shadow-soft focus:border-wine focus:outline-none"
        />
        <button type="submit" className="w-full rounded-lg bg-wine px-4 py-2 text-sm font-medium text-white shadow-soft transition-colors hover:bg-wine/90">
          Entrar
        </button>
      </form>
    </main>
  );
}