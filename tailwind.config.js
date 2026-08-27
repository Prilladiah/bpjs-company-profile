/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#4CAF50",
          "green-dark": "#3C9142",
          lime: "#C6D62E",
          blue: "#003C71",
          "blue-dark": "#00274D",
          "blue-light": "#EAF3FB",
          "blue-sky": "#1E88C7",
        },
      },
      fontFamily: {
        sans: ["Poppins", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 10px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
