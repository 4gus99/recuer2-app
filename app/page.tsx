"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type UserInfo = {
  email: string;
};

export default function HomePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkUser() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      if (!session) {
        router.push("/login");
        return;
      }

      setUserInfo({
        email: session.user.email ?? "Usuario sin email",
      });
      setLoading(false);
    }

    checkUser();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f3ef] text-[#3d2a2f]">
        <p>Cargando sesión...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f3ef] px-6 py-16 text-[#3d2a2f]">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#eaded7] bg-white p-8 shadow-sm">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[#9c6f78]">
          Supabase conectado
        </p>

        <h1 className="mb-4 text-3xl font-semibold">
          Ya tenés autenticación funcionando
        </h1>

        {error ? (
          <p className="mb-4 rounded-xl bg-red-100 p-3 text-red-700">
            Error: {error}
          </p>
        ) : null}

        <div className="mb-6 rounded-2xl bg-[#f6ece8] p-4">
          <p className="text-sm text-[#7a565d]">Usuario autenticado</p>
          <p className="mt-1 font-medium">{userInfo?.email}</p>
        </div>

        <div className="space-y-3">
          <p>
            El siguiente paso va a ser crear perfiles, recuerdos y subida de fotos.
          </p>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-[#b9858b] px-5 py-3 font-medium text-white transition hover:opacity-90"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </main>
  );
}