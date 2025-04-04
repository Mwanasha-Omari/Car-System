import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],  
  theme: {
    extend: {
      colors: {
        'orange': '#A63E1B',
        'dark-orange': '#EA5E2D',
        'grey': '#47596D',
        'navy-blue': '#1B2831',
        'sky-blue': '#AFCEE2',
        
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    
    },
  },
  plugins: [],
};

export default config;
