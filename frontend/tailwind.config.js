/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "2560px", // oder welcher Wert auch immer für dich sinnvoll ist
      },
    },
  },
  variants: {},
  plugins: [],
};
