/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af",
        secondary: "#0ea5e9",
        danger: "#ef4444",
        warning: "#f97316",
        success: "#10b981",
      },
    },
  },
  plugins: [],
}
