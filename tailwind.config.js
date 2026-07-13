/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ea580c', // Earthy Saffron
          dark: '#c2410c',
          light: '#ffedd5',
        },
        charcoal: {
          DEFAULT: '#0f172a', // Deep slate for premium contrast
          light: '#334155',
          muted: '#64748b',
        },
        cream: {
          DEFAULT: '#fdfbf7', // Warm off-white
          dark: '#f5f2eb',
          light: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in': 'slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.2s ease-out',
        'scale-in': 'scaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'cooking-progress': 'cookingProgress 2s ease-in-out infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        cookingProgress: {
          '0%': { width: '0%', marginLeft: '0%' },
          '50%': { width: '50%', marginLeft: '25%' },
          '100%': { width: '0%', marginLeft: '100%' },
        }
      },
    },
  },
  plugins: [],
}
