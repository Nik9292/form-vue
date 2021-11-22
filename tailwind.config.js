const defaultTheme = require('tailwindcss/defaultTheme');
const {colors} = defaultTheme

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      ...defaultTheme.screens,
      '2xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    },
    container: {
      center: true,
      padding: '1.25rem'
    },
    extend: {
      colors: {
        blue: {
          ...colors.blue,
          800: '#1a2454',
          900: '#000228',
        },
        gray: {
          ...colors.gray,
          200: '#8b949e',
          400: '#30363d',
          700: '#0d1117',
          900: '#0e0b14',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
