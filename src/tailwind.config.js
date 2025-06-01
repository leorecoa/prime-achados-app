/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-orange': 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFB347 100%)',
        'gradient-orange-dark': 'linear-gradient(135deg, #EA580C 0%, #DC2626 50%, #B91C1C 100%)',
        'gradient-orange-light': 'linear-gradient(135deg, #FED7AA 0%, #FDBA74 50%, #FB923C 100%)',
      },
    },
  },
  plugins: [],
}