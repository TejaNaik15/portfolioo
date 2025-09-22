/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0F1624', 
        'secondary-dark': '#1F2937', 
        'text-white': '#FFFFFF',
        'text-muted': '#B0B0B0', 
        'accent-pink': '#FF3C78',
        'accent-purple': '#945DD6', 
        'accent-yellow': '#F4D03F', 
        'accent-blue': '#13ADC7', 
      },
    },
  },
  plugins: [],
}