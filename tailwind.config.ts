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
        lightgrey1: '#F4F4F4',
        lightgrey2: '#F0F0F0',
        mediumgrey: '#828282',
        bluegrey: '#3B5252',
      },
      fontFamily: {
        sourceSans: ['Source Sans', 'sans-serif'],
        sourceSansItalic: ['Source Sans Italic', 'sans-serif'],
      },
      backgroundImage: {
        'hero-image':
          "linear-gradient(180deg, rgba(0,31,63,0) 0%, rgba(0,31,63,0) 60%, rgba(0,31,63) 100%), linear-gradient(270deg, rgba(0,31,63,0.2) 0%, rgba(0,31,63,0.6) 80%,rgba(0,31,63,0.6) 100%), linear-gradient(180deg, rgba(0,31,63,0) 70%, rgba(0,31,63,0.9) 80%, rgba(0,31,63,1) 100%), url('/images/home-banner-raw.webp')",
        'chequered-bg': "url('/images/chequered-bg.png')",
        'chequered-flipped': "url('/images/chequered-bg-flipped.png')",
        'building-detail': "url('/images/building-detail-bg.png')",
        houses:
          "linear-gradient(180deg, rgba(0,31,63,0) 0%, rgba(0,31,63,0) 60%, rgba(0,31,63) 100%), linear-gradient(270deg, rgba(0,31,63,0.2) 0%, rgba(0,31,63,0.6) 80%,rgba(0,31,63,0.6) 100%), url('/images/houses.png')",
        'building-detail-2': "url('/images/building-detail-2.png')",
      },
      borderRadius: {
        'br-120': '120px',
        'br-140': '140px',
        'br-180': '180px',
      },
      transitionProperty: {
        'max-height': 'max-height',
      },
    },
  },
  plugins: [],
};
export default config;
