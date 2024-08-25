/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/components/**/*.{js,vue,ts}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/plugins/**/*.{js,ts}',
    './src/app.vue',
    './src/error.vue',
  ],
  theme: {
    extend: {
      boxShadow: {
        brutalism: '5px 7px 0px 0px rgba(17, 19, 21, 1)',
      },
      colors: {
        primary: '#111315',
      },
    },
  },
  plugins: [],
};
