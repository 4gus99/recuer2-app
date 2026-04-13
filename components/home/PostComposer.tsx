"use client";

import { useState } from "react";
import { Camera, Images, BookOpen, Send } from "lucide-react";

const ACTION_CHIPS = [
  { id: "foto", icon: Camera, label: "Foto" },
  { id: "album", icon: Images, label: "Álbum" },
  { id: "historia", icon: BookOpen, label: "Historia" },
];

export function PostComposer() {
  const [text, setText] = useState("");

  return (
    <section className="px-4 pb-3">
      <div
        className="rounded-3xl p-4 shadow-card"
        style={{
          background: "#110e1e",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Top row */}
        <div className="flex items-center gap-3 mb-3">
          {/* Avatar */}
          <div
            className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-semibold"
            style={{
              background: "conic-gradient(from 0deg, #e8a4c8, #b89ee0, #c96fa8, #8b7ab5, #e8a4c8)",
              padding: "2px",
            }}
          >
            <div
              className="w-full h-full rounded-full flex items-center justify-center"
              style={{ background: "#110e1e" }}
            >
              <span className="text-[12px] font-bold" style={{ color: "#e8a4c8" }}>AG</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-foreground leading-none mb-0.5">
              Crear publicación
            </p>
            <p className="text-[11px] text-muted leading-none">
              Compartí un momento íntimo
            </p>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="¿Qué querés compartir hoy?"
          rows={3}
          className="w-full resize-none rounded-2xl px-4 py-3 text-[14px] leading-relaxed text-foreground placeholder:text-muted outline-none"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            caretColor: "#e8a4c8",
          }}
        />

        {/* Actions row */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            {ACTION_CHIPS.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                aria-label={label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-secondary text-[12px] font-medium hover:text-foreground transition-colors"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <Icon size={13} strokeWidth={2} />
                {label}
              </button>
            ))}
          </div>

          <button
            aria-label="Publicar"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-opacity active:opacity-80"
            style={{
              background: "linear-gradient(135deg, #c96fa8, #8b7ab5)",
              color: "#fff",
              boxShadow: "0 0 18px rgba(201,111,168,0.3)",
            }}
          >
            <Send size={13} strokeWidth={2} />
            Publicar
          </button>
        </div>
      </div>
    </section>
  );
}
