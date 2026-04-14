"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthContext";
import { HomeScreen } from "@/components/home/HomeScreen";
import { Lock } from "lucide-react";

function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  console.log("[v0] LoginScreen mounted, JS is working!");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Login attempt with:", email, password);
    const success = login(email, password);
    console.log("[v0] Login result:", success);
    if (!success) {
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #c96fa8 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-xs relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-full gradient-ring p-[3px] mb-6 shadow-glow-pink">
            <div className="w-full h-full rounded-full bg-surface flex items-center justify-center">
              <Lock size={32} className="text-pink-soft" strokeWidth={1.8} />
            </div>
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-lavender-muted mb-2">
            Red Social Privada
          </p>
          <h1 className="text-[30px] font-bold text-foreground tracking-tight">
            Nuestro espacio
          </h1>
          <p className="text-[13px] text-secondary mt-1">
            Solo para nosotros dos.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="glow-card rounded-2xl bg-surface border border-white/[0.06] overflow-hidden">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
              placeholder="Tu email"
              className="w-full bg-transparent px-5 py-4 text-[14px] text-foreground placeholder:text-muted focus:outline-none"
              style={{ caretColor: "#e8a4c8" }}
              autoComplete="email"
            />
          </div>

          <div className="glow-card rounded-2xl bg-surface border border-white/[0.06] overflow-hidden">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Contraseña"
              className="w-full bg-transparent px-5 py-4 text-[14px] text-foreground placeholder:text-muted focus:outline-none"
              style={{ caretColor: "#e8a4c8" }}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-center text-[13px] text-pink-soft animate-pulse">
              Contraseña incorrecta
            </p>
          )}

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-deep to-lavender text-white text-[14px] font-semibold shadow-glow-pink hover:opacity-90 active:scale-[0.98] transition-all"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-[11px] text-muted mt-8">
          Nuestro rincón privado
        </p>
        <p className="text-center text-[10px] text-muted/50 mt-2">
          amor@amor.com / amor
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  const { loggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 rounded-full border-2 border-pink-soft border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!loggedIn) {
    return <LoginScreen />;
  }

  return <HomeScreen />;
}
