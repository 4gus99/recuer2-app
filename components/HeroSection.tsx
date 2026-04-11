'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { heroContent } from '@/data/site-content';
import { Container } from './Container';
import { FloatingDecorations } from './FloatingDecorations';
import { MusicPlayer } from './MusicPlayer';

export function HeroSection() {
  return (
    <section className="section-shell relative min-h-screen overflow-hidden pt-5 sm:pt-8">
      <FloatingDecorations />
      <Container className="relative z-10">
        <div className="glass-panel grid min-h-[calc(100vh-2rem)] items-center gap-10 overflow-hidden px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="order-2 lg:order-1"
          >
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-wine/75">Un regalo para tu día</p>
            <h1 className="font-serif text-5xl leading-none text-cocoa sm:text-6xl lg:text-7xl">
              {heroContent.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-cocoa/80 sm:text-lg">{heroContent.subtitle}</p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <a
                href="#intro"
                className="inline-flex items-center justify-center rounded-full bg-wine px-6 py-3.5 text-sm font-medium text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-rosewood"
              >
                {heroContent.ctaPrimary}
              </a>
              <a
                href="#carta"
                className="inline-flex items-center justify-center rounded-full border border-wine/20 bg-white/70 px-6 py-3.5 text-sm font-medium text-cocoa transition hover:-translate-y-0.5 hover:bg-white"
              >
                {heroContent.ctaSecondary}
              </a>
              <MusicPlayer />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.12, ease: 'easeOut' }}
            className="order-1 lg:order-2"
          >
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[32px] border border-white/70 bg-white/40 shadow-soft">
              <Image
                src="/images/hero-main.jpg"
                alt="Foto principal romántica para la portada"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/20 via-transparent to-white/10" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
