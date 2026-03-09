/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        taupe: {
          50: '#f9f6f3',
          100: '#f0ebe4',
          200: '#ddd3c6',
          300: '#c4b09a',
          400: '#a98b6d',
          500: '#8B7355',
          600: '#7a6249',
          700: '#65503c',
          800: '#554233',
          900: '#47382d',
        }
      },
      transitionDuration: {
        '150': '150ms',
      }
    },
  },
  plugins: [],
}
