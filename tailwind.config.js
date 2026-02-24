// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", "sans-serif"],
      },
      colors: {
        primary: "#1e40af", // You can change this to any hex color you want
      },
    },
  },
  plugins: [],
};
