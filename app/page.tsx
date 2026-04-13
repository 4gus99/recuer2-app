"use client";

import { HomeScreen } from "@/components/home/HomeScreen";
import { useAuth } from "@/components/AuthContext";
import { useState } from "react";

function LoginGate() {
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(password);
    if (!ok) setError(true);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-6"
      style={{ background: "#08060f" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #c96fa8 0%, transparent 70%)" }}
      />

      <div className="w-full max-w-xs relative z-10">
        <p className="text-center text-[10px] font-semibold tracking-[0.22em] uppercase text-muted mb-2">
          Red Social Privada
        </p>
        <h1 className="text-center text-[28px] font-semibold text-foreground mb-1">
          Nuestro espacio
        </h1>
        <p className="text-center text-[13px] text-secondary mb-10">
          Solo para nosotros dos.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            className="w-full px-4 py-3.5 rounded-2xl text-[14px] text-foreground placeholder:text-muted outline-none"
            style={{
              background: "#110e1e",
              border: error
                ? "1px solid rgba(232,164,200,0.5)"
                : "1px solid rgba(255,255,255,0.07)",
              caretColor: "#e8a4c8",
            }}
          />
          {error && (
            <p className="text-[12px] text-center" style={{ color: "#e8a4c8" }}>
              Contraseña incorrecta. Intentá de nuevo.
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl text-[14px] font-semibold text-white transition-opacity active:opacity-80"
            style={{
              background: "linear-gradient(135deg, #c96fa8, #8b7ab5)",
              boxShadow: "0 0 24px rgba(201,111,168,0.3)",
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { loggedIn } = useAuth();
  return loggedIn ? <HomeScreen /> : <LoginGate />;
}
