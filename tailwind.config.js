/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        asphalt: {
          50: '#f6f7f8',
          100: '#eceef1',
          200: '#d4d9df',
          300: '#aeb6c1',
          400: '#828e9e',
          500: '#636f81',
          600: '#4e5868',
          700: '#404856',
          800: '#383f4a',
          900: '#0f1419',
          950: '#080b0f',
        },
        amber: {
          50: '#fffaeb',
          100: '#fff1c6',
          200: '#ffe188',
          300: '#ffca4a',
          400: '#ffb01f',
          500: '#f59011',
          600: '#d96d06',
          700: '#b44d08',
          800: '#92390e',
          900: '#782e0f',
        },
        steel: {
          50: '#f0f4f8',
          100: '#dfe7f0',
          200: '#c9d6e3',
          300: '#a6bbd2',
          400: '#7e98b8',
          500: '#607b9e',
          600: '#4d6484',
          700: '#40536c',
          800: '#37465a',
          900: '#313c4d',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
        marquee: 'marquee 40s linear infinite',
        'spin-slow': 'spin 18s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      backgroundImage: {
        'grid-faint': "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
