/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "2560px", // oder welcher Wert auch immer für dich sinnvoll ist
      },
      colors: {
        customPrimary: "#f5cfb0",
        customSecondary: "#d1655bc2",
        customTertiary: "#329694",
        customQuartiary: "#eb8c80",
        customQuintiary: "#d1655bc2",
        customYellow: "#E3D3E0",
        customGray: "#52396a",
      },
    },
  },
  variants: {},
  plugins: [],
};
