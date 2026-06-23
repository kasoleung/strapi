const deloitteGreen = {
  primary100: '#e8f5d9',
  primary200: '#c5e39a',
  primary500: '#9ed05a',
  primary600: '#86BC25',
  primary700: '#6B9A1E',
  buttonPrimary500: '#86BC25',
  buttonPrimary600: '#6B9A1E',
};

const theme = {
  light: {
    colors: {
      ...deloitteGreen,
      neutral0: '#ffffff',
      neutral100: '#f5f5f5',
      neutral150: '#ebebeb',
      neutral200: '#e0e0e0',
    },
  },
  dark: {
    colors: {
      ...deloitteGreen,
      neutral0: '#000000',
      neutral100: '#0a0a0a',
      neutral150: '#1a1a1a',
      neutral200: '#2a2a2a',
      neutral300: '#3a3a3a',
      neutral800: '#d0d0d0',
      neutral900: '#f0f0f0',
    },
  },
};

export default theme;
