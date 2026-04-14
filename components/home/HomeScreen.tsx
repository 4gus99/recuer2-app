"use client";

import { HomeHeader } from "./HomeHeader";
import { StoriesRail } from "./StoriesRail";
import { PostComposer } from "./PostComposer";
import { FeedPost, type PostData } from "./FeedPost";
import { BottomNav } from "./BottomNav";

const feedPosts: PostData[] = [
  {
    id: "1",
    author: "Abril",
    avatar: "/images/gallery-2.jpg",
    timestamp: "hace 2 horas",
    content:
      "Cada momento junto a vos se convierte en un recuerdo que guardo en el corazón. Gracias por ser mi paz en medio del caos. 💜",
    image: "/images/gallery-3.jpg",
    likes: 47,
    comments: 12,
  },
  {
    id: "2",
    author: "Agus",
    avatar: "/images/gallery-1.jpg",
    timestamp: "hace 5 horas",
    content:
      "No necesito lugares extraordinarios cuando tengo a la persona más extraordinaria a mi lado. Te amo infinito. ✨",
    image: "/images/gallery-4.jpg",
    likes: 83,
    comments: 21,
  },
  {
    id: "3",
    author: "Abril",
    avatar: "/images/gallery-2.jpg",
    timestamp: "ayer",
    content:
      "Nuestro aniversario fue mágico. Tres años de amor, risas y aventuras. Por muchos más juntos. 🌸",
    image: "/images/gallery-5.jpg",
    likes: 124,
    comments: 34,
  },
];

export function HomeScreen() {
  return (
    <div className="min-h-screen w-full max-w-md mx-auto relative bg-background">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-96 h-96 opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, #c96fa8 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative pb-32">
        <HomeHeader />
        <StoriesRail />
        <PostComposer />

        {/* Divider */}
        <div className="px-5 py-3">
          <div className="h-px bg-white/[0.05]" />
        </div>

        {/* Feed */}
        <section className="px-5 space-y-5">
          {feedPosts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
