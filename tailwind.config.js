/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coconut: {
          green: '#173F32',
          dark: '#0D241C',
          cream: '#F5F0E5',
          lime: '#B9D957',
          husk: '#A75B3B',
        }
      },
      fontFamily: {
        display: ['Syne', 'serif', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
