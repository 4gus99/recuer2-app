"use client";

import { motion } from 'motion/react';

export function SectionTitle({
  eyebrow,
  title,
  description,
  centered = false
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
    >
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-wine/75">{eyebrow}</p>
      <h2 className="font-serif text-4xl leading-tight text-cocoa sm:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-cocoa/80 sm:text-lg">{description}</p> : null}
    </motion.div>
  );
}
