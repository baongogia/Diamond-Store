/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "2k": "2560px",
      "4k": "3840px",
    },
    textShadow: {
      default: "2px 2px 2px rgba(0, 0, 0, 0.3)",
      md: "4px 4px 3px rgba(0, 0, 0, 0.3)",
      lg: "6px 6px 4px rgba(6, 148, 6, 1)",
      xl: "8px 8px 6px rgba(0, 0, 0, 0.3)",
    },
    extend: {},
  },
  plugins: [require("tailwindcss-textshadow")],
};
