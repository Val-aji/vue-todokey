/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{vue, js,ts,jsx,tsx,}"],
  theme: {
    extend: {
      spacing: {
        "10vh": "10vh",
      },
      fontFamily: {
        "ROBOTO": ['Roboto', 'sans-serif'],
        "POPPINS": ['Poppins', 'sans-serif']
      },
      screens: {
        "preHp": "280px",
        "preTablet": "420px",
        "tablet": "577px",
        "desktop": "960px"
      },
      colors: {
        "dark": "black",
        "light": "white"
      }
    },
  },
  plugins: [],
}
