import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070711',
          900: '#0B0B18',
          850: '#101021',
          800: '#15152B',
          700: '#1E1E38',
          600: '#2A2A48',
          500: '#3A3A5E',
        },
        brand: {
          50: '#F1EEFF',
          100: '#E4DDFF',
          200: '#CBBEFF',
          300: '#AC97FF',
          400: '#8F73FF',
          500: '#7450F5',
          600: '#5B37DC',
          700: '#4728B0',
          800: '#361F87',
          900: '#281765',
        },
        aqua: {
          300: '#7BE7FF',
          400: '#38D6F5',
          500: '#12B8DC',
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
        glow: '0 0 70px -14px rgba(143, 115, 255, 0.55)',
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
