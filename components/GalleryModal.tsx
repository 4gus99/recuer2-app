'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import type { GalleryItem } from '@/lib/types';

export function GalleryModal({
  item,
  onClose
}: {
  item: GalleryItem | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/20 bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/85 px-3 py-2 text-sm font-medium text-cocoa shadow-soft"
            >
              Cerrar
            </button>
            <div className="relative aspect-[4/3] w-full bg-sand/30">
              <Image src={item.src} alt={item.alt} fill className="object-cover" />
            </div>
            <div className="px-6 py-5">
              <p className="text-sm leading-7 text-cocoa/80">{item.caption}</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
