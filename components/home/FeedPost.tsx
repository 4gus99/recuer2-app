"use client";

import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";

export interface PostData {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
}

interface FeedPostProps {
  post: PostData;
}

export function FeedPost({ post }: FeedPostProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setLiked((prev) => {
      setLikesCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
  };

  return (
    <article className="glow-card rounded-[28px] bg-surface overflow-hidden border border-white/[0.06]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full gradient-ring p-[2px]">
            <img
              src={post.avatar}
              alt={post.author}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-[14px] font-semibold text-foreground leading-tight">
              {post.author}
            </h4>
            <p className="text-[11px] text-muted mt-0.5">{post.timestamp}</p>
          </div>
        </div>
        <button
          aria-label="Más opciones"
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-raised transition-colors"
        >
          <MoreHorizontal size={18} className="text-secondary" strokeWidth={1.8} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-[14px] text-foreground/90 leading-relaxed">{post.content}</p>
      </div>

      {/* Image */}
      {post.image && (
        <div className="relative aspect-[4/5] bg-surface-raised mx-3 rounded-2xl overflow-hidden">
          <img
            src={post.image}
            alt="Foto del post"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
      )}

      {/* Actions */}
      <div className="p-4 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              aria-label={liked ? "Quitar me gusta" : "Me gusta"}
              onClick={handleLike}
              className="p-2.5 -ml-2.5 rounded-full hover:bg-surface-raised transition-all active:scale-90"
            >
              <Heart
                size={24}
                strokeWidth={liked ? 0 : 1.8}
                fill={liked ? "#e8a4c8" : "transparent"}
                className={liked ? "text-pink-soft" : "text-secondary"}
              />
            </button>
            <button
              aria-label="Comentar"
              className="p-2.5 rounded-full hover:bg-surface-raised transition-colors"
            >
              <MessageCircle size={24} strokeWidth={1.8} className="text-secondary hover:text-lavender transition-colors" />
            </button>
            <button
              aria-label="Enviar"
              className="p-2.5 rounded-full hover:bg-surface-raised transition-colors"
            >
              <Send size={22} strokeWidth={1.8} className="text-secondary hover:text-lavender transition-colors" />
            </button>
          </div>
          <button
            aria-label={saved ? "Quitar de guardados" : "Guardar"}
            onClick={() => setSaved((s) => !s)}
            className="p-2.5 -mr-2.5 rounded-full hover:bg-surface-raised transition-all active:scale-90"
          >
            <Bookmark
              size={22}
              strokeWidth={1.8}
              fill={saved ? "#b89ee0" : "transparent"}
              className={saved ? "text-lavender" : "text-secondary"}
            />
          </button>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 mt-2 text-[12px] text-secondary font-medium">
          <span>{likesCount} me gusta</span>
          <span>{post.comments} comentarios</span>
        </div>
      </div>
    </article>
  );
}
