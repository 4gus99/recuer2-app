"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
            "Cuenta creada, revisá tu mail lokita <3."
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
    <main className="min-h-screen bg-[#f8f3ef] px-6 py-16 text-[#3d2a2f]">
      <div className="mx-auto max-w-md rounded-3xl border border-[#eaded7] bg-white p-8 shadow-sm">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[#9c6f78]">
          Nuestro espacio privado
        </p>

        <h1 className="mb-6 text-3xl font-semibold">
          {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-[#dbcac2] px-4 py-3 outline-none focus:border-[#b8858f]"
              placeholder="tuemail@email.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-[#dbcac2] px-4 py-3 outline-none focus:border-[#b8858f]"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#b9858b] px-4 py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {loading
              ? "Procesando..."
              : mode === "login"
              ? "Entrar"
              : "Crear cuenta"}
          </button>
        </form>

        {message ? (
          <p className="mt-4 rounded-xl bg-[#f6ece8] p-3 text-sm text-[#7a565d]">
            {message}
          </p>
        ) : null}

        <div className="mt-6 text-sm">
          {mode === "login" ? (
            <p>
              ¿No tenés cuenta?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setMessage("");
                }}
                className="font-medium text-[#9c6f78] underline"
              >
                Crear cuenta
              </button>
            </p>
          ) : (
            <p>
              ¿Ya tenés cuenta?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setMessage("");
                }}
                className="font-medium text-[#9c6f78] underline"
              >
                Iniciar sesión
              </button>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}