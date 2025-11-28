/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./assets/**/*.{otf,ttf}"],
  presets: [require("nativewind/preset")],
  theme: {
  
    extend: {
      colors: {
        text: '#111827',
        background: {
          light: "#ebd6adff",
          dark: "#1b1b1b",
        },
        parchment: "#cec2a4ff",
        ink: "#3a2e2a",
        moss: "#728546ff",
        blood: "#8d3335ff",
        wood: "#5a4632",
        gold: "#d4af37",
      },
      fontFamily: {
        medieval: ["Cinzel-Regular", "serif"],
      },
    },
  },
  plugins: [
  ],

}

