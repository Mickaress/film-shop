import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000000',
      lightgray: '#f2f2f2',
      gray: '#a4a4a4',
      blue: '#3d68ed',
      darkgray: '#383838',
      red: '#e24c4c',
    },
    extend: {
      boxShadow: {
        main: '0 0 0.3125rem rgb(0 0 0 / 18%)',
      },
    },
  },
  plugins: [],
};
export default config;
