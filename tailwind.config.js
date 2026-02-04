/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './blog/**/*.html',
    './scripts/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EBF5FB',
          100: '#D6EAF8',
          200: '#AED6F1',
          300: '#85C1E9',
          400: '#5DADE2',
          500: '#2874A6',
          600: '#1B4F72',
          700: '#154360',
          800: '#0E2F44',
          900: '#071B28'
        },
        accent: '#5DADE2',
        highlight: '#FF9900',
        dark: {
          bg: '#0B1929',
          card: '#112240',
          text: '#E0E7EF',
          muted: '#8892A4',
          border: '#1E3A5F'
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Source Sans 3', 'sans-serif']
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-in-right': 'slideInRight 0.5s ease forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        slideInRight: {
          'from': { opacity: '0', transform: 'translateX(-20px)' },
          'to': { opacity: '1', transform: 'translateX(0)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    }
  },
  plugins: []
}
