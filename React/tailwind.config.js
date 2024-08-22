/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "system-ui"],
        poppins: ["Poppins", "monospace"],
        moderustic: ["Moderustic", "monospace"],
      },
    },
  },
  plugins: [],
}
