///** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./components/**/*.{tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      primary: "rgb(var(--color-values) / <alpha-value>)",
      secondary: '#FBBF24',
      text: '#111827',
      accent: '#10B981',
      background: {
        light: "#f6f1e7",
        dark: "#1b1b1b",
      },
    },
    extend: {},
  },
  plugins: [

    ({ addBase}) =>
      addBase({
        ":root": { 
          "--color-values": "59 130 246", // Tailwind's blue-500
          "--color-rgb": "rgb(59, 130, 246)",
         },
      }),
  ],

}

