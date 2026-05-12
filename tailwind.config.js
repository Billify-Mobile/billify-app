/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        billify: {
          primary: "#1E3A8A", // Deep Navy
          secondary: "#3B82F6", // Electric Blue
          accent: "#6366F1", // Indigo
          success: "#10B981", // Green
          danger: "#EF4444", // Red
          background: "#F8FAFC",
        },
      },
    },
  },
  plugins: [],
};