"use client";

import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase";
import { LogOut, Settings } from "lucide-react";

export function HomeHeader() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header
      className="sticky top-0 z-40 flex items-end justify-between px-4 pb-3 pt-12"
      style={{
        background: "linear-gradient(to bottom, #08060f 70%, transparent)",
      }}
    >
      <div>
        <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
          Red Social Privada
        </p>
        <h1 className="text-[26px] font-semibold leading-tight tracking-tight text-foreground">
          Nuestro espacio
        </h1>
      </div>

      <div className="flex items-center gap-2 pb-1">
        <button
          aria-label="Configuración"
          className="flex h-9 w-9 items-center justify-center rounded-full text-secondary transition-colors hover:text-foreground"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <Settings size={17} strokeWidth={1.8} />
        </button>

        <button
          aria-label="Cerrar sesión"
          onClick={handleLogout}
          className="flex h-9 w-9 items-center justify-center rounded-full text-secondary transition-colors hover:text-pink-soft"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <LogOut size={17} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}