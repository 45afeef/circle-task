/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%": { marginLeft: "0px" },
          "20%": { marginLeft: "-30px" },
          "40%": { marginLeft: "30px" },
          "60%": { marginLeft: "-20px" },
          "80%": { marginLeft: "20px" },
          "100%": { marginLeft: "0px" },
        },
        zoom: {
          "0%": { scale: 0 },
        },
        opacity: {
          "0%": { opacity: 0 },
        },
        fromCenter: {
          "0%": { top: "50%" },
        },
      },
      animation: {
        "shake-left-right": "shake 1s linear infinite",
        "zoom-in": "zoom 1s linear 1",
        "opacity-forwards": "opacity 1s linear 1",
        fromCenter: "fromCenter 1s linear 1 forwards",
      },
    },
  },
  plugins: [],
};
