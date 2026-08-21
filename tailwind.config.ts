import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050A12',
          900: '#08111E',
          850: '#0C1727',
          800: '#111E31',
          700: '#1A2B44',
          600: '#253956',
          500: '#33496A',
        },
        /* Brand blue — taken from the PayBot logo (#3B9BE0). */
        brand: {
          50: '#EEF7FD',
          100: '#D9EDFB',
          200: '#B4DCF6',
          300: '#86C6EF',
          400: '#5BAFE7',
          500: '#3B9BE0',
          600: '#2A82C6',
          700: '#20679F',
          800: '#1A507B',
          900: '#153C5C',
        },
        aqua: {
          300: '#8FE3FF',
          400: '#4FD1F5',
          500: '#17B4E0',
        },
        mint: {
          400: '#3DDC97',
          500: '#1FBF7C',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 70px -14px rgba(59, 155, 224, 0.6)',
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -24px rgba(0,0,0,0.9)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        marquee: 'marquee 45s linear infinite',
        'marquee-slow': 'marquee 70s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
