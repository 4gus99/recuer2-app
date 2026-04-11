import Image from 'next/image';
import type { MemoryItem } from '@/lib/types';
import { Reveal } from './Reveal';

export function MemoryCard({ item, reverse = false }: { item: MemoryItem; reverse?: boolean }) {
  return (
    <Reveal>
      <article
        className={`grid gap-6 overflow-hidden rounded-[28px] border border-white/70 bg-white/65 p-4 shadow-soft backdrop-blur-md sm:p-5 lg:grid-cols-2 lg:items-center lg:gap-8 ${
          reverse ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
          <Image src={item.image} alt={item.alt} fill className="object-cover transition duration-500 hover:scale-[1.03]" />
        </div>
        <div className="px-1 sm:px-2">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-wine/70">{item.date}</p>
          <h3 className="font-serif text-3xl text-cocoa sm:text-4xl">{item.title}</h3>
          <p className="mt-4 max-w-xl text-base leading-8 text-cocoa/80">{item.description}</p>
        </div>
      </article>
    </Reveal>
  );
}
