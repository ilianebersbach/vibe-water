/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      colors: {
        vibe: {
          red: '#C0392B',
          blue: '#2980B9',
          cyan: '#00D4FF',
          gold: '#F39C12',
          dark: '#0C0C0C',
          navy: '#0A101D',
        },
      },
    },
  },
  plugins: [],
}
