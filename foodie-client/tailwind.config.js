/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "green": "#39DB4A",
        "purple":"purple",
        "red": "#FF6868",
        "yellow":"#FFFF00",
        "secondary": "#555",
        "prigmayBG": "#FCFCFC"
      }
    },
  },
  plugins: [require("daisyui")],
}

