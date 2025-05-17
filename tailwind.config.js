/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      animation: {
        'float': 'float 3s ease-in-out forwards',
        'pulse': 'pulse 2s infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0)', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { transform: 'translateY(-40px)', opacity: 0 }
        },
      },
    },
  },
  plugins: [],
};