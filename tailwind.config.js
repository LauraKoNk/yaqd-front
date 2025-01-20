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
      colors: {
        "title-color": "rgba(var(--title-color))",
        "general-bg": "rgba(var(--general-bg))",
        "card-bg": "rgba(var(--card-bg))",
        "general-hover": "rgba(var(--general-hover))",
        "general-border": "rgba(var(--general-border))",
        "form-border": "rgba(var(--form-border))",
        "form-button-border": "rgba(var(--form-button-border))",
        "form-button-hover": "rgba(var(--form-button-hover))",
        "form-button-textPreTransform": "rgba(var(--form-button-textPreTransform))",
        "form-button-textPostTransform": "rgba(var(--form-button-textPostTransform))",
        "filters-title": "rgba(var(--filters-title))",
        "filters-border": "rgba(var(--filters-border))",
        "filters-selected-title": "rgba(var(--filters-selected-title))",
        "card-text-color": "rgba(var(--card-text-color))",
        "svg-color": "rgba(var(--svg-color))",
        "ring-color": "rgba(var(--ring-color))",
      },
    },
  },
  plugins: [],
}

