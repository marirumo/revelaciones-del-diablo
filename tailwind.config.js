/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pridi', 'system-ui', 'sans-serif'],
      },
      colors: {
        'hell': {
          'bg': '#201e45',
          'card': '#111136',
          'sidebar': '#74334d',
          'active': '#e5e3ff',
          'gold': '#f5f5f5',
          'gold-soft': '#fdc452',
          'orange': '#fd6b33',
          'orange-dark': '#ff4166',
          'red': '#691134',
          'meme': '#404edf',
          'flourish': '#00b9c5',
          'border': '#3a3670',
          'text-secondary': '#b3b0d9',
          'text-muted': '#7d7ab0',
        }
      },
      backgroundColor: {
        'hell-bg': '#201e45',
        'hell-card': '#111136',
      },
      borderColor: {
        'hell': '#3a3670',
      }
    },
  },
  plugins: [],
}
