/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-pink': '#ff6b9a',
        'lavender': '#c8a2ff',
        'accent-white': '#fff5f8',
      },
      fontFamily: {
        'cursive': ['Great Vibes', 'cursive'],
        'soft': ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'fadeIn': 'fadeIn 1.5s ease-in forwards',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.2)' },
          '50%': { transform: 'scale(1)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(255, 107, 154, 0.5), 0 0 40px rgba(200, 162, 255, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(255, 107, 154, 0.8), 0 0 60px rgba(200, 162, 255, 0.5)',
          },
        },
      },
    },
  },
  plugins: [],
}
