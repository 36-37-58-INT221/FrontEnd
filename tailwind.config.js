const colors = require('tailwindcss/colors')
module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        redst: '#d62828',
        redpastel : '#f94144',
        greenpastel : '#43aa8b',
      }
    }
  },

  variants: {
    extend: {},
  },
  plugins: [],
}
