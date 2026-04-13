"use client";

import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";

export interface PostData {
  id: string;
  authorName: string;
  authorInitials: string;
  authorColor: string;
  timestamp: string;
  content: string;
  imageGradient?: string;
  imageLabel?: string;
  likesCount: number;
  commentsCount: number;
  preview?: string;
}

interface FeedPostProps {
  post: PostData;
}

export function FeedPost({ post }: FeedPostProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(post.likesCount);

  const handleLike = () => {
    setLiked((prev) => {
      setLikes((l) => (prev ? l - 1 : l + 1));
      return !prev;
    });
  };

  return (
    <article
      className="rounded-3xl overflow-hidden shadow-card"
      style={{
        background: "#110e1e",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 4px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="w-10 h-10 rounded-full flex-shrink-0"
            style={{
              background: "conic-gradient(from 0deg, #e8a4c8, #b89ee0, #c96fa8, #8b7ab5, #e8a4c8)",
              padding: "2px",
            }}
          >
            <div
              className="w-full h-full rounded-full flex items-center justify-center"
              style={{ background: "#110e1e" }}
            >
              <span className="text-[11px] font-bold" style={{ color: post.authorColor }}>
                {post.authorInitials}
              </span>
            </div>
          </div>

          <div>
            <p className="text-[13px] font-semibold text-foreground leading-none mb-0.5">
              {post.authorName}
            </p>
            <p className="text-[11px] text-muted leading-none">{post.timestamp}</p>
          </div>
        </div>

        <button
          aria-label="Más opciones"
          className="w-8 h-8 flex items-center justify-center rounded-full text-muted hover:text-secondary transition-colors"
        >
          <MoreHorizontal size={18} strokeWidth={1.8} />
        </button>
      </div>

      {/* Content */}
      {post.content && (
        <p className="px-4 text-[14px] leading-relaxed text-foreground mb-3">
          {post.content}
        </p>
      )}

      {/* Image area */}
      {post.imageGradient && (
        <div
          className="mx-3 rounded-2xl overflow-hidden"
          style={{ aspectRatio: "4/3" }}
        >
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{ background: post.imageGradient }}
          >
            {post.imageLabel && (
              <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
                {post.imageLabel}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            aria-label={liked ? "Quitar me gusta" : "Me gusta"}
            onClick={handleLike}
            className="flex items-center gap-1.5 transition-transform active:scale-90"
          >
            <Heart
              size={22}
              strokeWidth={liked ? 0 : 1.8}
              fill={liked ? "#e8a4c8" : "transparent"}
              className={liked ? "" : "text-secondary"}
              style={{ color: liked ? "#e8a4c8" : undefined }}
            />
            <span
              className="text-[13px] font-medium tabular-nums"
              style={{ color: liked ? "#e8a4c8" : "#9b90b8" }}
            >
              {likes}
            </span>
          </button>

          <button aria-label="Comentar" className="flex items-center gap-1.5 text-secondary">
            <MessageCircle size={21} strokeWidth={1.8} />
            <span className="text-[13px] font-medium tabular-nums">{post.commentsCount}</span>
          </button>

          <button aria-label="Enviar" className="text-secondary">
            <Send size={21} strokeWidth={1.8} />
          </button>
        </div>

        <button
          aria-label={saved ? "Quitar guardado" : "Guardar"}
          onClick={() => setSaved((s) => !s)}
          className="transition-transform active:scale-90"
        >
          <Bookmark
            size={21}
            strokeWidth={1.8}
            fill={saved ? "#b89ee0" : "transparent"}
            style={{ color: saved ? "#b89ee0" : "#9b90b8" }}
          />
        </button>
      </div>

      {/* Preview / metadata */}
      {post.preview && (
        <div
          className="mx-3 mb-3 px-3 py-2.5 rounded-xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-[12px] text-secondary leading-relaxed">{post.preview}</p>
        </div>
      )}
    </article>
  );
}
