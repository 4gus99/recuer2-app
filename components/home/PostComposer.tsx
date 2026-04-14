"use client";

import { useState } from "react";
import { Camera, Images, Clock } from "lucide-react";

const actionChips = [
  { id: "foto", icon: Camera, label: "Foto" },
  { id: "album", icon: Images, label: "Álbum" },
  { id: "historia", icon: Clock, label: "Historia" },
];

export function PostComposer() {
  const [text, setText] = useState("");

  return (
    <section className="px-5 py-2">
      <div className="glow-card rounded-[28px] bg-surface p-5 border border-white/[0.06]">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-11 h-11 rounded-full gradient-ring p-[2px] flex-shrink-0">
            <img
              src="/images/gallery-1.jpg"
              alt="Tu avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="pt-0.5">
            <h3 className="text-[15px] font-semibold text-foreground leading-tight">
              Crear publicación
            </h3>
            <p className="text-[12px] text-secondary mt-0.5">
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
          className="w-full bg-surface-raised/70 rounded-2xl px-4 py-3.5 text-[14px] text-foreground placeholder:text-muted resize-none border border-white/[0.06] focus:border-lavender-muted/40 focus:outline-none transition-colors leading-relaxed"
          style={{ caretColor: "#e8a4c8" }}
        />

        {/* Actions */}
        <div className="flex items-center justify-between mt-4 gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {actionChips.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-surface-raised/80 border border-white/[0.06] text-secondary text-[12px] font-medium hover:bg-plum/50 hover:text-foreground hover:border-lavender-muted/20 transition-all active:scale-95"
              >
                <Icon size={14} strokeWidth={2} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-deep to-lavender text-white text-[13px] font-semibold shadow-glow-pink hover:opacity-90 active:scale-95 transition-all">
            Publicar
          </button>
        </div>
      </div>
    </section>
  );
}
