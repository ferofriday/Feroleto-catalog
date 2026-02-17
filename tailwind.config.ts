import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F6F4F0',
        green: '#3B5332',
        'green-mid': '#506B44',
        'green-soft': '#7A9466',
        brown: '#7D6B56',
        clay: '#B87A52',
        sand: '#C8BDAB',
        warm: '#EAE6DE',
        line: '#DDD8CE',
        dark: '#2A2926',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-source-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
