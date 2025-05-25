/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        textprimary: "#D5DC14",
      },
      fontFamily: {
        sans: ["var(--font-bruno)", "sans-serif"],
        bruno: ["var(--font-bruno)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
