/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'wallop-semibold': ['Wallop-semibold', 'sans-serif'],
        'wallop-medium': ['Wallop-medium', 'sans-serif'],
        'spicyRice': ['Spicy Rice', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

