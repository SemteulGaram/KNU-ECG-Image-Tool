/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        // primary color: #FF00C3
        bwgray: 'gray',
        primary: {
          50: '#FFF0F9',
          100: '#FFD6F1',
          200: '#FFAEE5',
          300: '#FF85D9',
          400: '#FF5CCD',
          500: '#FF33C1',
          600: '#FF00B5',
          700: '#E600A9',
          800: '#CC009D',
          900: '#B20091',
        },
      },
    },
  },
  plugins: [],
};
