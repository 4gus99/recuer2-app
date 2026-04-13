"use client";

import { useState } from "react";
import { Home, Images, BookOpen, Clock, User } from "lucide-react";

const TABS = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "albums", label: "Álbumes", icon: Images },
  { id: "historias", label: "Historias", icon: BookOpen },
  { id: "recuerdos", label: "Recuerdos", icon: Clock },
  { id: "perfil", label: "Perfil", icon: User },
];

export function BottomNav() {
  const [active, setActive] = useState("inicio");

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 pt-2 px-4"
      style={{ background: "transparent" }}
    >
      <div
        className="flex items-center gap-1 px-3 py-2.5 rounded-full"
        style={{
          background: "rgba(18, 14, 30, 0.92)",
          backdropFilter: "blur(28px) saturate(1.6)",
          WebkitBackdropFilter: "blur(28px) saturate(1.6)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setActive(id)}
              className="flex flex-col items-center justify-center gap-1 px-3.5 py-1.5 rounded-full transition-all duration-200"
              style={{
                background: isActive ? "rgba(201,111,168,0.15)" : "transparent",
                minWidth: 52,
              }}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2 : 1.6}
                style={{
                  color: isActive ? "#e8a4c8" : "#5c5280",
                }}
              />
              <span
                className="text-[9.5px] font-semibold leading-none tracking-wide"
                style={{ color: isActive ? "#e8a4c8" : "#5c5280" }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
