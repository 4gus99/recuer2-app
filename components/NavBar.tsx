"use client";

import { useAuth } from './AuthContext';

export function NavBar() {
  const { logout } = useAuth();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-end bg-white/70 px-4 py-2 backdrop-blur-md shadow-glass">
      <button onClick={logout} className="text-sm font-medium text-wine hover:underline focus:outline-none">
        Cerrar sesión
      </button>
    </nav>
  );
}