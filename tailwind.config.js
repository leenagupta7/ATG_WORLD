module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '150': '150px', // Defines a custom width of 150px
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
