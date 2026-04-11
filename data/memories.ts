import type { MemoryItem } from '@/lib/types';

export const memories: MemoryItem[] = [
  {
    id: 'first-date',
    title: 'Nuestra primera salida',
    date: 'Abril 2024',
    description:
      'Ese día entendí que había algo distinto. No fue solo una salida: fue el inicio de una forma nueva de mirar mis días.',
    image: '/images/memory-1.jpg',
    alt: 'Primer recuerdo juntos en una salida especial'
  },
  {
    id: 'trip',
    title: 'Un viaje que quedó para siempre',
    date: 'Agosto 2024',
    description:
      'Entre paisajes, charlas largas y silencios cómodos, aprendí que viajar con vos también es sentirme en casa.',
    image: '/images/memory-2.jpg',
    alt: 'Foto de un viaje romántico juntos'
  },
  {
    id: 'funny-day',
    title: 'Ese día en que no paramos de reír',
    date: 'Noviembre 2024',
    description:
      'Hay fotos lindas, y después están esos recuerdos que tienen sonido. Este, para mí, siempre va a sonar a tu risa.',
    image: '/images/memory-3.jpg',
    alt: 'Momento divertido y espontáneo de la pareja'
  },
  {
    id: 'quiet-moment',
    title: 'Un momento simple, pero nuestro',
    date: 'Febrero 2025',
    description:
      'No hizo falta que pasara algo enorme. Bastó estar ahí, con vos, para que ese instante se volviera inolvidable.',
    image: '/images/memory-4.jpg',
    alt: 'Momento íntimo y tranquilo de la pareja'
  }
];
