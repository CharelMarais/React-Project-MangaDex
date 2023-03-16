/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "index.html",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      color: {
        "turtle-hermit-orange": "#fd5d01",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
