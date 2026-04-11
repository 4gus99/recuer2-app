'use client';

import Image from 'next/image';
import { useState } from 'react';
import { galleryItems } from '@/data/gallery';
import type { GalleryItem } from '@/lib/types';
import { Container } from './Container';
import { GalleryModal } from './GalleryModal';
import { Reveal } from './Reveal';
import { SectionTitle } from './SectionTitle';

export function GallerySection() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <section className="section-shell section-spacing">
      <Container>
        <SectionTitle
          eyebrow="Galería"
          title="Una colección de escenas que hablan por sí solas"
          description="Podés cambiar estas imágenes fácilmente por tus propias fotos desde la carpeta public/images."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
          {galleryItems.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <button
                type="button"
                onClick={() => setSelected(item)}
                className="group relative aspect-[4/5] w-full overflow-hidden rounded-[24px] border border-white/70 bg-white/50 text-left shadow-soft"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa/50 via-transparent to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-sm leading-6 text-white">{item.caption}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>
      <GalleryModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
