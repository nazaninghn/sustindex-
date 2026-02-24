import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1F7A63",
        neutral: "#2E2E2E",
        accent: "#4C6EF5",
        success: "#28A745",
        warning: "#FF6B35",
        gold: "#FFD700",
      },
    },
  },
  plugins: [],
};
export default config;
