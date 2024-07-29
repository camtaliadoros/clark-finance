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
        chalk: '#F8F9FA',
        ash: '#232426',
        magenta: '#C4558C',
        green: '#33A477',
        yellow: '#FFC844',
        orange: '#F2582A',
        purple: '#765298',
        darkblue: '#336EA4',
        red: '#BC2D1E',
        lightblue: '#59BFFF',
        mediumblue: '#1A8BD1',
      },
      fontFamily: {
        sourceSans: ['Source Sans', 'sans-serif'],
        sourceSansItalic: ['Source Sans Italic', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
