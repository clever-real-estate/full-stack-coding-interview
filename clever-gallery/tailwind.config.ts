import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        helvetica: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  content: ["./src/**/*.{ts,tsx}"],
  plugins: [],
};

export default config;
