/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-red': '#db5a5a',
        'custom-black': '#353232',
        'custom-green': '#36908a',
        'custom-orange': '#b85c3c',
        'custom-brown': '#4b433a',
        'custom-blue': '#1f4959'
      },
      fontFamily: {
        'serif': ['serif', 'serif'],
        'sans': ['sans', 'sans-serif'],
        'mono': ['mono', 'monospace'],
      }
    },
  },
  plugins: [],
}

