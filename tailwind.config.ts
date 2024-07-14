import type { Config } from "tailwindcss";

const config: Config = {
  content: [],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ]
};
export default config;