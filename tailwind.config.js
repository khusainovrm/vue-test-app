const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  // purge: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      padding: {
        1.3: '1.375rem', //22px
      },
      fontFamily: {
        sans: ['Fira Sans', ...fontFamily.sans],
        heading: ['"Cambria"'],
        cambria: ['Cambria'],
      },
      boxShadow: {
        special: '0px 4px 16px rgba(0, 15, 38, 0.25)',
      },
      borderRadius: {
        special50: '3.125rem',
      },
      fontSize: {
        xxs: ['11px', '11.88px'],
        xs: ['12px', '12.96px'],
        small: ['13px', '14.04x'],
        base: ['15px', '16.2px'],
        basexl: ['15px', '28.5px'],
      },
      minHeight: {
        39: '39px',
      },
      colors: {
        'light-blue': '#E1EDFF',
        'light-gray': '#F5F7FA',
        'granny-apple': '#d0f4e3',
        // blue
        main: {
          50: '#f2f7ff',
          100: '#e6f0ff',
          200: '#bfd9ff',
          300: '#99c2ff',
          400: '#4d94ff',
          500: '#0066ff',
          600: '#005ce6',
          700: '#004dbf',
          800: '#003d99',
          900: '#00327d',
        },
        // pink
        second: {
          50: '#fff4f9',
          100: '#ffe9f4',
          200: '#ffc8e3',
          300: '#ffa7d1',
          400: '#ff65af',
          500: '#ff238d',
          600: '#e6207f',
          700: '#bf1a6a',
          800: '#991555',
          900: '#7d1145',
        },
        //gray
        third: {
          50: '#f9fafc',
          100: '#f4f5f8',
          200: '#e3e6ee',
          300: '#d2d7e4',
          400: '#b0bacf',
          500: '#8e9cbb',
          600: '#808ca8',
          700: '#6b758c',
          800: '#555e70',
          900: '#464c5c',
        },
        // gray fro border
        iron: {
          50: '#fdfdfd',
          100: '#fbfbfc',
          200: '#f4f5f7',
          300: '#edeff2',
          400: '#e0e4e9',
          500: '#d3d8df',
          600: '#bec2c9',
          700: '#9ea2a7',
          800: '#7f8286',
          900: '#676a6d',
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
}
