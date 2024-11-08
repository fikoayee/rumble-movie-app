/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: { 
        xs: '0px', // matches breakpoints with MUI library 
        sm: '600px', 
        md: '900px', 
        lg: '1200px', 
        xl: '1536px', 
      },
    },
  },
  plugins: [],
};
