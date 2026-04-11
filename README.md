# Regalo de cumpleaños romántico — Next.js + TypeScript + Tailwind + Motion

Una experiencia web de una sola página, pensada como regalo de cumpleaños para tu novia.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Motion

## Instalar

```bash
npm install
```

## Correr en desarrollo

```bash
npm run dev
```

Abrí:

```bash
http://localhost:3000
```

## Build de producción

```bash
npm run build
npm run start
```

## Estructura

```bash
app/
components/
data/
lib/
public/images/
public/music/
```

## Cómo cambiar textos

- `data/site-content.ts` → hero, introducción, carta final y frase de cierre
- `data/memories.ts` → recuerdos
- `data/gallery.ts` → galería
- `data/messages.ts` → frases cortas
- `data/timeline.ts` → línea de tiempo

## Cómo cambiar fotos

1. Reemplazá los archivos dentro de `public/images/`
2. Mantené los mismos nombres o actualizá las rutas en los archivos de `data/`

Ejemplo:

- `public/images/hero-main.jpg`
- `public/images/memory-1.jpg`
- `public/images/gallery-1.jpg`

## Cómo cambiar la música

1. Poné tu archivo MP3 dentro de `public/music/`
2. Cambiá la ruta en `components/MusicPlayer.tsx`

Por defecto usa:

```tsx
src="/music/romantica.mp3"
```

## Personalización rápida

### Colores
Modificar en:

- `tailwind.config.ts`
- `app/globals.css`

### Tipografías
Modificar en:

- `app/layout.tsx`

### Animaciones
Modificar en:

- `components/Reveal.tsx`
- secciones específicas como `HeroSection.tsx` o `GalleryModal.tsx`

## Recomendaciones

- Usá fotos con buena luz y encuadre vertical/horizontal variado
- Elegí una canción suave y significativa
- Personalizá la carta final antes de publicarlo
- Probalo bien desde celular, porque este tipo de regalo normalmente se abre desde ahí
