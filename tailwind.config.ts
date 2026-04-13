import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#08060f',
        surface: '#110e1e',
        'surface-raised': '#1a1528',
        plum: '#2d1f45',
        pink: {
          soft: '#e8a4c8',
          deep: '#c96fa8',
          muted: '#a0587e',
        },
        lavender: {
          DEFAULT: '#b89ee0',
          muted: '#8b7ab5',
          dark: '#5c4d8a',
        },
        foreground: '#f0eaf8',
        secondary: '#9b90b8',
        muted: '#5c5280',
      },
      fontFamily: {
        sans: ['var(--font-sans)', '-apple-system', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 4px 32px rgba(0,0,0,0.65), 0 1px 0 rgba(255,255,255,0.04) inset, 0 0 0 1px rgba(255,255,255,0.06)',
        'glow-pink': '0 0 24px rgba(201,111,168,0.2), 0 0 48px rgba(201,111,168,0.08)',
        'glow-lavender': '0 0 20px rgba(184,158,224,0.15)',
      },
      borderRadius: {
        '2xl': '1.125rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backgroundImage: {
        'pink-lavender': 'conic-gradient(from 0deg, #e8a4c8, #b89ee0, #c96fa8, #8b7ab5, #e8a4c8)',
      },
    },
  },
  plugins: [],
};

export default config;
