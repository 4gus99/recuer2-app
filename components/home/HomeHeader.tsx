"use client";

import { useAuth } from "@/components/AuthContext";
import { LogOut, Settings } from "lucide-react";

export function HomeHeader() {
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 px-5 pt-14 pb-4 bg-gradient-to-b from-background via-background/95 to-transparent">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-lavender-muted mb-1">
            Red Social Privada
          </p>
          <h1 className="text-[28px] font-bold text-foreground tracking-tight leading-none">
            Nuestro espacio
          </h1>
        </div>

        <div className="flex items-center gap-2 pb-0.5">
          <button
            aria-label="Configuración"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-raised/60 border border-white/5 text-secondary hover:text-foreground hover:bg-surface-raised transition-all active:scale-95"
          >
            <Settings size={18} strokeWidth={1.8} />
          </button>

          <button
            aria-label="Cerrar sesión"
            onClick={logout}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-raised/60 border border-white/5 text-secondary hover:text-pink-soft hover:bg-surface-raised transition-all active:scale-95"
          >
            <LogOut size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </header>
  );
}
