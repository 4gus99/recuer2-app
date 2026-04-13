"use client";

import { HomeScreen } from "@/components/home/HomeScreen";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      setCheckingSession(false);
    }

    checkSession();
  }, [router]);

  if (checkingSession) {
    return (
      <main
        className="min-h-screen w-full flex items-center justify-center text-white"
        style={{ background: "#08060f" }}
      >
        <div className="text-center">
          <p
            className="text-[11px] uppercase tracking-[0.28em] mb-3"
            style={{ color: "#b78ad8" }}
          >
            Red social privada
          </p>
          <p className="text-white/70">Cargando nuestro espacio...</p>
        </div>
      </main>
    );
  }

  return <HomeScreen />;
}