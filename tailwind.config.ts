import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        bistre: {
          DEFAULT: '#251605',
          100: '#070401',
          200: '#0e0902',
          300: '#160d03',
          400: '#1d1104',
          500: '#251605',
          600: '#764710',
          700: '#c9781b',
          800: '#e8a65a',
          900: '#f4d2ac',
        },
        brown_sugar: {
          DEFAULT: '#c57b57',
          100: '#2b180f',
          200: '#55301d',
          300: '#80482c',
          400: '#aa603a',
          500: '#c57b57',
          600: '#d19779',
          700: '#ddb19b',
          800: '#e8cbbc',
          900: '#f4e5de',
        },
        atomic_tangerine: {
          DEFAULT: '#f1ab86',
          100: '#441d08',
          200: '#873a10',
          300: '#cb5618',
          400: '#e97e45',
          500: '#f1ab86',
          600: '#f4bda0',
          700: '#f7ceb8',
          800: '#f9ded0',
          900: '#fcefe7',
        },
        peach_yellow: {
          DEFAULT: '#f7dba7',
          100: '#4c3407',
          200: '#97670e',
          300: '#e39b15',
          400: '#f0bc5b',
          500: '#f7dba7',
          600: '#f8e2b8',
          700: '#fae9ca',
          800: '#fcf0dc',
          900: '#fdf8ed',
        },
        mint_cream: {
          DEFAULT: '#f4fffd',
          100: '#006452',
          200: '#00c8a3',
          300: '#2dffd8',
          400: '#91ffeb',
          500: '#f4fffd',
          600: '#f7fffe',
          700: '#f9fffe',
          800: '#fbfffe',
          900: '#fdffff',
        },
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
