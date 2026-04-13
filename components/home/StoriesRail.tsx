"use client";

import { Plus } from "lucide-react";

const STORIES = [
  { id: "add", label: "Tu historia", isAdd: true, color: "#e8a4c8", initials: "TH" },
  { id: "agus", label: "Agus", isAdd: false, color: "#c96fa8", initials: "AG" },
  { id: "abril", label: "Abril", isAdd: false, color: "#b89ee0", initials: "AB" },
  { id: "playa", label: "Playa", isAdd: false, color: "#8b7ab5", initials: "PL" },
  { id: "aniversario", label: "Aniversario", isAdd: false, color: "#d4a0d8", initials: "AN" },
  { id: "costa", label: "Costa", isAdd: false, color: "#a07cc5", initials: "CO" },
];

const AVATAR_BG: Record<string, string> = {
  add: "rgba(232,164,200,0.12)",
  agus: "rgba(201,111,168,0.18)",
  abril: "rgba(184,158,224,0.18)",
  playa: "rgba(139,122,181,0.18)",
  aniversario: "rgba(212,160,216,0.18)",
  costa: "rgba(160,124,197,0.18)",
};

export function StoriesRail() {
  return (
    <section aria-label="Historias" className="px-4 pb-2">
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
        {STORIES.map((story) => (
          <button
            key={story.id}
            aria-label={story.isAdd ? "Crear historia" : `Ver historia de ${story.label}`}
            className="flex-shrink-0 flex flex-col items-center gap-1.5 group"
          >
            {/* Ring + Avatar */}
            <div className="relative">
              {/* Gradient ring */}
              <div
                className="w-[66px] h-[66px] rounded-full flex items-center justify-center"
                style={{
                  background: story.isAdd
                    ? "rgba(255,255,255,0.06)"
                    : "conic-gradient(from 0deg, #e8a4c8, #b89ee0, #c96fa8, #8b7ab5, #e8a4c8)",
                  padding: story.isAdd ? 0 : "2.5px",
                }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center text-foreground text-[15px] font-semibold"
                  style={{
                    background: story.isAdd ? "transparent" : "#08060f",
                    padding: story.isAdd ? 0 : "2px",
                  }}
                >
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{ background: AVATAR_BG[story.id] }}
                  >
                    {story.isAdd ? (
                      <div className="flex flex-col items-center gap-0.5">
                        <div
                          className="w-[22px] h-[22px] rounded-full flex items-center justify-center"
                          style={{ background: "rgba(232,164,200,0.85)" }}
                        >
                          <Plus size={13} className="text-background" strokeWidth={2.5} />
                        </div>
                      </div>
                    ) : (
                      <span
                        className="text-[13px] font-semibold"
                        style={{ color: story.color }}
                      >
                        {story.initials}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Label */}
            <span className="text-[11px] font-medium text-secondary leading-none max-w-[64px] text-center truncate">
              {story.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
