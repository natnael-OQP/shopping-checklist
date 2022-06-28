/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        popi: ["Poppins"],
      },
      colors: {
        color1: "#64ffda",
        color2: "#8892b0",
        color3: "#ccd6f6",
      },
    },
  },
  plugins: [],
};
