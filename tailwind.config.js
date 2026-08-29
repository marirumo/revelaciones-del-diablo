/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        nameplate: ['Oswald', 'Arial Narrow', 'sans-serif'],
        sans: ['Oswald', 'Arial Narrow', 'sans-serif'],
      },
      colors: {
        paper: '#F7F5EE',
        ink: '#141311',
        sub: '#767061',
        accent: '#E11D48',
      },
    },
  },
  plugins: [],
}
