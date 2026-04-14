"use client";

import { useState } from "react";
import { Home, Images, Clock, Sparkles, User } from "lucide-react";

const tabs = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "albums", label: "Álbumes", icon: Images },
  { id: "historias", label: "Historias", icon: Clock },
  { id: "recuerdos", label: "Recuerdos", icon: Sparkles },
  { id: "perfil", label: "Perfil", icon: User },
];

export function BottomNav() {
  const [active, setActive] = useState("inicio");

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2"
    >
      <div className="bottom-nav-blur rounded-[26px] border border-white/[0.07] mx-auto max-w-md shadow-xl">
        <div className="flex items-center justify-around py-2.5 px-1">
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setActive(id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-200 ${
                  isActive ? "bg-plum/50" : "hover:bg-surface-raised/50"
                }`}
              >
                <Icon
                  size={21}
                  strokeWidth={isActive ? 2 : 1.6}
                  className={isActive ? "text-pink-soft" : "text-muted"}
                />
                <span
                  className={`text-[10px] font-semibold transition-colors ${
                    isActive ? "text-pink-soft" : "text-muted"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
