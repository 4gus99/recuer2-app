"use client";

import { useAuth } from "@/components/AuthContext";
import { LogOut, Settings } from "lucide-react";

export function HomeHeader() {
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 px-4 pt-12 pb-3 flex items-end justify-between" style={{ background: "linear-gradient(to bottom, #08060f 70%, transparent)" }}>
      <div>
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted mb-0.5">
          Red Social Privada
        </p>
        <h1 className="text-[26px] font-semibold tracking-tight text-foreground leading-tight">
          Nuestro espacio
        </h1>
      </div>

      <div className="flex items-center gap-2 pb-1">
        <button
          aria-label="Configuración"
          className="w-9 h-9 rounded-full flex items-center justify-center text-secondary hover:text-foreground transition-colors"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <Settings size={17} strokeWidth={1.8} />
        </button>
        <button
          aria-label="Cerrar sesión"
          onClick={logout}
          className="w-9 h-9 rounded-full flex items-center justify-center text-secondary hover:text-pink-soft transition-colors"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <LogOut size={17} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}
