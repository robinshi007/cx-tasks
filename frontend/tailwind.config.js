const colors = require('tailwindcss/colors');

module.exports = {
  //purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
        fuchsia: colors.fuchsia,
        violet: colors.violet,
        purple: colors.purple,
        lightBlue: colors.lightBlue,
        cyan: colors.cyan,
        teal: colors.teal,
        emerald: colors.emerald,
        lime: colors.lime,
        amber: colors.amber,
        orange: colors.orange,
        coolGray: colors.coolGray,
        trueGray: colors.trueGray,
        warmGray: colors.warmGray,
        blueGray: colors.blueGray,
        blue: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3',
          600: '#1e88e5',
          700: '#1976d2',
          800: '#1565c0',
          900: '#0d47a1',
        },
      },
      backgroundColor: ['active'],
      minWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '1/3': '33.3333%',
        '2/3': '66.6667%',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['first', 'last'],
    },
  },
  plugins: [],
};
