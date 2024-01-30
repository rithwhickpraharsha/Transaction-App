/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        green : "#A7D7C5",
        lightwhite:"#F6FBF9",
        darkgreen:"#1b5e20",
      }
    },
  },
  plugins: [],
}