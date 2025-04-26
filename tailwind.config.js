/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0081a7',
        secondary: '#00afb9',
        accent: '#fdfcdc',
        soft: '#fed9b7',
        warm: '#f07167',
      },
    },
  },
  plugins: [],
}
