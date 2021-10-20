module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
       },
       minWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
       },
       minHeight: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
       }
    },
  },
  variants: {
    extend: {
      margin: ['last', 'first'],
      backgroundColor: ['active', 'disabled'],
    },
  },
  safelist: [
    'text-blue-400',
  ],
  plugins: []
}
