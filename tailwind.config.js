/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundColor: {
        platinum: "#CCCCCC",
        gold: "#FFD700",
        "blue-diamond": "#4EE2EC",
      },
      animation: {
        marquee: "marquee 100s linear infinite",
        marquee2: "marquee2 100s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
