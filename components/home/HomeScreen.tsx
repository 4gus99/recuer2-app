"use client";

import { HomeHeader } from "./HomeHeader";
import { StoriesRail } from "./StoriesRail";
import { PostComposer } from "./PostComposer";
import { FeedPost, type PostData } from "./FeedPost";
import { BottomNav } from "./BottomNav";

const FEED: PostData[] = [
  {
    id: "1",
    authorName: "Agus",
    authorInitials: "AG",
    authorColor: "#e8a4c8",
    timestamp: "hace 2 horas",
    content: "Hoy me desperté pensando en vos. Hay algo en la luz de la mañana que me recuerda a tu sonrisa. Te amo más de lo que las palabras alcanzan. 🌸",
    imageGradient: "linear-gradient(135deg, #2a1635 0%, #1a0e2e 40%, #2d1545 100%)",
    imageLabel: "Un momento nuestro",
    likesCount: 47,
    commentsCount: 12,
    preview: "❤️ A Abril le gustó esto · \"Siempre tan hermoso lo que escribís...\"",
  },
  {
    id: "2",
    authorName: "Abril",
    authorInitials: "AB",
    authorColor: "#b89ee0",
    timestamp: "hace 5 horas",
    content: "Fotos de nuestra tarde en la costa. El mar, el atardecer y vos. No necesito nada más en este mundo.",
    imageGradient: "linear-gradient(160deg, #1a2035 0%, #0f1a2e 50%, #1e1535 100%)",
    imageLabel: "Costa — Atardecer",
    likesCount: 83,
    commentsCount: 21,
    preview: "📍 Costa Atlántica · Guardado en Álbum \"Playa 2024\"",
  },
  {
    id: "3",
    authorName: "Agus",
    authorInitials: "AG",
    authorColor: "#e8a4c8",
    timestamp: "ayer",
    content: "Tres años juntos hoy. Cada día me enamoro de algo nuevo en vos. Gracias por elegirme siempre.",
    imageGradient: "linear-gradient(135deg, #2d1535 0%, #1e0d30 50%, #2a1a3d 100%)",
    imageLabel: "Aniversario ✨",
    likesCount: 124,
    commentsCount: 34,
    preview: "🎂 Aniversario · 3 años · Guardado como Recuerdo",
  },
];

export function HomeScreen() {
  return (
    <div
      className="min-h-screen w-full max-w-md mx-auto relative"
      style={{ background: "#08060f" }}
    >
      {/* Subtle ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-80 h-80 opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #c96fa8 0%, transparent 70%)" }}
      />

      {/* Scrollable content */}
      <div className="overflow-y-auto pb-36">
        <HomeHeader />

        <div className="py-2">
          <StoriesRail />
        </div>

        <div className="pt-1 pb-2">
          <PostComposer />
        </div>

        {/* Divider */}
        <div className="px-4 pb-4">
          <div
            className="h-px"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
        </div>

        {/* Feed */}
        <div className="flex flex-col gap-4 px-4">
          {FEED.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
