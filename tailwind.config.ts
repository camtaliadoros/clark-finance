import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'text-chalk',
    'text-mediumblue',
    'hover:bg-chalk',
    'hover:bg-mediumblue',
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
        navy: '#001F3F',
      },
      fontFamily: {
        sourceSans: ['Source Sans', 'sans-serif'],
        sourceSansItalic: ['Source Sans Italic', 'sans-serif'],
      },
      backgroundImage: {
        'hero-image':
          "linear-gradient(180deg, rgba(0,31,63,0) 0%, rgba(0,31,63,0) 60%, rgba(0,31,63) 100%), linear-gradient(270deg, rgba(0,31,63,0.2) 0%, rgba(0,31,63,0.6) 80%,rgba(0,31,63,0.6) 100%), url('/images/home-banner.png')",
      },
      // animation: {
      //   'slide-bg': 'slide 1s linear',
      // },
      // keyframes: {
      //   slide: {
      //     '0%': {
      //       transform: 'translateX(-100%)',
      //     },
      //     '100%': {
      //       transform: 'translateX(0)',
      //     },
      //   },
      // },
      transitionProperty: {
        left: 'transition: left 0.5s ease',
      },
    },
  },
  plugins: [],
};
export default config;
