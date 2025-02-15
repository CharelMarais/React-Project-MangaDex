/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "index.html",
    "public/index.html",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#00B4D8",
        "primary-accent": "#1A2E40",
        "secondary": "#4B3F72",
        "text": "#F0EAD6",
        "accents": "#1A2E40",
      },
      backgroundImage: {
        'gradient-twilight': "linear-gradient(to top, #1A2E40, #2D2A26)", 
        "secondary-gradient": "linear-gradient(to top, rgba(75, 63, 114, 0.4), rgba(0, 180, 216, 0.4))",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
