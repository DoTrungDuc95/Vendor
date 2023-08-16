/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '400px': '400px',
        '800px': '800px',
        '1000px': '1050px',
        '1100px': '1110px',
        '1300px': '1300px',
      },
    },
  },
  plugins: [],
};
