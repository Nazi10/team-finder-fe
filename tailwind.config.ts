import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: "#FFFFFF",
        primary: {
          DEFAULT: "#FFFF00",
        },
        secondary: {
          dark: "#000",
        },
        success: {
          25: "#F6FEF9",
          300: "#6CE9A6",
          700: "#027A48",
        },
      },
    },
  },
  plugins: [],
};
export default config;
