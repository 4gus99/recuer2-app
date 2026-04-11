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
        blush: '#f1d7d5',
        peach: '#f4ddd2',
        cream: '#fff9f5',
        sand: '#eadfd6',
        wine: '#8b5a67',
        cocoa: '#5b464d',
        rosewood: '#a56a77'
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif']
      },
      boxShadow: {
        soft: '0 20px 60px rgba(117, 87, 96, 0.12)',
        glass: '0 12px 40px rgba(113, 76, 86, 0.12)'
      },
      backgroundImage: {
        'romantic-radial': 'radial-gradient(circle at top, rgba(255,255,255,0.95), rgba(255,249,245,0.78) 32%, rgba(241,215,213,0.50) 100%)'
      }
    }
  },
  plugins: []
};

export default config;
