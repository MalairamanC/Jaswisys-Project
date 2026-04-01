/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-scale': 'fadeInScale 0.3s ease-out forwards',
        'glow': 'glow 2s infinite alternate',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        fadeInScale: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(255,255,255,0.4)' },
          '100%': { boxShadow: '0 0 25px rgba(255,255,255,0.8)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        }
      },
      borderRadius: {
        'blob': '40% 60% 60% 40% / 50% 50% 50% 50%',
      },
    },
  },
  plugins: [],
}