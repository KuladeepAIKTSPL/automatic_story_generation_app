/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0A0920', // Deep Navy
        surface: '#131130', // Lighter Navy
        primary: '#00F5FF', // Electric Cyan
        secondary: '#FF00E5', // Vivid Magenta
        accent: '#F7FF00', // Lemon Yellow
        'slate': {
          850: '#172033', // Kept for card backgrounds
          900: '#0f172a', // Kept for body
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in-up': 'slideInUp 0.5s ease-in-out',
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px 0px rgba(255, 0, 229, 0.4)' }, // Secondary color glow
          '50%': { boxShadow: '0 0 30px 5px rgba(255, 0, 229, 0.6)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
