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
      },
      animation: {
        "shake-left-right": "shake 1s linear infinite",
      },
    },
  },
  plugins: [],
};
