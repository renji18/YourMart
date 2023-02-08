/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        slab: "'Roboto Slab', serif",
        custom:"'Inconsolata', monospace"
      }
    },
  },
  plugins: [],
}