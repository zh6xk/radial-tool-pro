/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          dark: '#0b0f17',
          card: '#161d2b',
          cyan: '#0ea5e9',
          accent: '#38bdf8'
        }
      }
    },
  },
  plugins: [],
}