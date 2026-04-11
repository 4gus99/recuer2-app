"use client";

import { useState, FormEvent } from 'react';
import { Container } from './Container';
import { SectionTitle } from './SectionTitle';

export function PostsSection() {
  const [text, setText] = useState('');
  const [posts, setPosts] = useState<{
    id: number;
    content: string;
    timestamp: string;
  }[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    const now = new Date();
    const timestamp = now.toLocaleString();
    setPosts((prev) => [
      ...prev,
      { id: Date.now(), content: trimmed, timestamp }
    ]);
    setText('');
  };

  return (
    <section className="section-shell section-spacing">
      <Container>
        <SectionTitle
          eyebrow="Posteos"
          title="Comparte tus pensamientos"
          description="Escribí un mensaje o dedicatoria para que quede grabada aquí."
          centered
        />
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Escribí algo bonito..."
            className="w-full rounded-lg border border-wine/30 bg-white/70 p-3 text-cocoa shadow-soft focus:border-wine focus:outline-none"
          />
          <button
            type="submit"
            className="w-max rounded-lg bg-wine px-5 py-2 text-sm font-medium text-white shadow-soft transition-colors hover:bg-wine/90"
          >
            Publicar
          </button>
        </form>
        {posts.length > 0 && (
          <div className="mt-10 space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="rounded-lg border border-wine/10 bg-white/60 p-4 backdrop-blur-sm shadow-glass"
              >
                <p className="text-base text-cocoa whitespace-pre-line">{post.content}</p>
                <p className="mt-2 text-xs text-cocoa/60">{post.timestamp}</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}