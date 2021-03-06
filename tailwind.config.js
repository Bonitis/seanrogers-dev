const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    colors: {
      ...colors,
      custom: {
        'dark-blue': '#2D3047',
        'light-blue': '#009DDC',
        'orange': '#F26430',
        'green': '#009B72',
        'pink': '#CB429F',
        'white': '#fff'
      }
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '1': '1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    extend: {},
  },
  plugins: [],
}
