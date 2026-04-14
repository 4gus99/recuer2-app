"use client";

import { Plus } from "lucide-react";

const stories = [
  { id: "add", label: "Tu historia", isAdd: true },
  { id: "agus", label: "Agus", image: "/images/gallery-1.jpg" },
  { id: "abril", label: "Abril", image: "/images/gallery-2.jpg" },
  { id: "playa", label: "Playa", image: "/images/gallery-3.jpg" },
  { id: "aniversario", label: "Aniversario", image: "/images/gallery-4.jpg" },
  { id: "costa", label: "Costa", image: "/images/gallery-5.jpg" },
];

export function StoriesRail() {
  return (
    <section aria-label="Historias" className="py-3">
      <div className="flex gap-4 overflow-x-auto px-5 pb-2 scrollbar-hide">
        {stories.map((story) => (
          <button
            key={story.id}
            aria-label={story.isAdd ? "Crear historia" : `Ver historia de ${story.label}`}
            className="flex flex-col items-center gap-2 flex-shrink-0 group"
          >
            <div className="relative">
              {/* Gradient ring wrapper */}
              <div
                className={`w-[70px] h-[70px] rounded-full p-[2.5px] transition-transform group-active:scale-95 ${
                  story.isAdd ? "bg-surface-raised border border-white/10" : "gradient-ring"
                }`}
              >
                {/* Inner background circle */}
                <div className="w-full h-full rounded-full bg-background p-[2.5px]">
                  {story.isAdd ? (
                    <div className="w-full h-full rounded-full bg-surface-raised flex items-center justify-center border border-white/5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-soft to-lavender flex items-center justify-center">
                        <Plus size={16} className="text-background" strokeWidth={2.5} />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={story.image}
                      alt={story.label}
                      className="w-full h-full rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
            <span className="text-[11px] font-medium text-secondary group-hover:text-foreground transition-colors max-w-[70px] truncate">
              {story.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
