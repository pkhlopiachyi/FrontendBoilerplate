import { createTheme } from '@material-ui/core'

const paletteColors = {
  white: '#FFFFFF',
  dark: '#000000',
}

const baseTheme = createTheme({
  spacing: 2,
  overrides: {
    MuiTypography: {
      h1: {
        fontWeight: 'bold',
        color: paletteColors.dark,
      },
      h2: {
        fontSize: 24,
        fontWeight: 'bold',
        color: paletteColors.dark,
      },
      h3: {
        fontSize: 22,
        fontWeight: 'bold',
        color: paletteColors.dark,
      },
      h4: {
        fontSize: 18,
        fontWeight: 'bold',
        color: paletteColors.dark,
      },
      h5: {
        fontSize: 16,
        fontWeight: 'bold',
        color: paletteColors.dark,
      },
      h6: {},
      body1: {
        fontSize: 14,
        color: paletteColors.dark,
      },
    },
  },
})

export { baseTheme, paletteColors }
