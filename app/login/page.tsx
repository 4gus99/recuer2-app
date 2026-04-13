"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.push("/");
      }
    }

    checkSession();
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          setMessage(error.message);
          return;
        }

        if (data.user) {
          setMessage(
            "Cuenta creada. Si tu proyecto pide confirmación por mail, revisá tu correo. Si no, ya podés iniciar sesión."
          );
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setMessage(error.message);
          return;
        }

        router.push("/");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(214,137,198,0.16),_transparent_28%),linear-gradient(180deg,_#07030d_0%,_#0b0613_45%,_#08040f_100%)] px-6 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <div className="w-full rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_80px_rgba(0,0,0,0.45),0_0_60px_rgba(190,120,255,0.08)] backdrop-blur-xl">
          <p className="mb-3 text-center text-[11px] uppercase tracking-[0.35em] text-[#b78ad8]">
            Red social privada
          </p>

          <h1 className="text-center text-5xl font-semibold leading-none tracking-[-0.04em] text-white">
            Nuestro
            <br />
            espacio
          </h1>

          <p className="mt-4 text-center text-sm text-white/55">
            Solo para nosotros dos.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tuemail@email.com"
                className="w-full rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#d78cc8]/70 focus:bg-white/[0.05]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
                className="w-full rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#d78cc8]/70 focus:bg-white/[0.05]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-[20px] bg-[linear-gradient(90deg,_#d68bc7_0%,_#b08ae6_100%)] px-5 py-4 text-base font-semibold text-white shadow-[0_10px_35px_rgba(206,137,215,0.28)] transition hover:opacity-95 disabled:opacity-60"
            >
              {loading
                ? "Procesando..."
                : mode === "login"
                  ? "Entrar"
                  : "Crear cuenta"}
            </button>
          </form>

          {message ? (
            <div className="mt-4 rounded-[18px] border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-white/75">
              {message}
            </div>
          ) : null}

          <div className="mt-6 text-center text-sm text-white/60">
            {mode === "login" ? (
              <>
                ¿No tenés cuenta?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setMessage("");
                  }}
                  className="font-medium text-[#e0a0d3] underline underline-offset-4"
                >
                  Crear cuenta
                </button>
              </>
            ) : (
              <>
                ¿Ya tenés cuenta?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setMessage("");
                  }}
                  className="font-medium text-[#e0a0d3] underline underline-offset-4"
                >
                  Iniciar sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}