'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    __birthdayAudioPlaying__?: boolean;
  }
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onCanPlay = () => setIsReady(true);
    const onPlay = () => {
      setIsPlaying(true);
      window.__birthdayAudioPlaying__ = true;
    };
    const onPause = () => {
      setIsPlaying(false);
      window.__birthdayAudioPlaying__ = false;
    };

    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error('No se pudo reproducir el audio:', error);
      }
      return;
    }

    audio.pause();
  };

  return (
    <>
      <audio ref={audioRef} loop preload="metadata" src="/music/romantica.mp3" />
      <button
        type="button"
        onClick={toggleAudio}
        className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/70 px-4 py-3 text-sm font-medium text-cocoa shadow-soft backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white"
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Pausar música de fondo' : 'Reproducir música de fondo'}
      >
        <span className={`h-2.5 w-2.5 rounded-full ${isPlaying ? 'bg-wine' : 'bg-wine/35'}`} />
        {isPlaying ? 'Pausar música' : isReady ? 'Reproducir música' : 'Cargando música'}
      </button>
    </>
  );
}
