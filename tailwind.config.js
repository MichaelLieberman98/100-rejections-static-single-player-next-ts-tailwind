/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      'sm': { 'min': '0px' },
      'lg': { 'min': '650px' }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
