import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Neutral ramp for the light theme — 50 lightest, 950 darkest. */
        ink: {
          50: '#F7FAFD',
          100: '#EFF4FA',
          200: '#DEE8F2',
          300: '#C6D6E6',
          400: '#8397AD',
          500: '#5E7389',
          600: '#4F6478',
          700: '#3A4C5E',
          800: '#243545',
          900: '#132433',
          950: '#0A1723',
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
          600: '#0E85A8',
        },
        mint: {
          400: '#3DDC97',
          500: '#1FBF7C',
          600: '#0E8B58',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 18px 50px -22px rgba(59, 155, 224, 0.65)',
        card: '0 1px 2px 0 rgba(16, 40, 64, 0.05), 0 16px 32px -22px rgba(16, 40, 64, 0.35)',
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
