/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3498db',
        secondary: '#2c3e50',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}

