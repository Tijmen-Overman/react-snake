import { css } from 'styled-components'

// Fonts
const fonts = {
  Merriweather: 'Merriweather'
}

// Font Weights
const fontWeights = {
  light: 300,
  medium: 400,
  bold: 700
}

// @import uses the same weights as the JM website for now.
const fontFaces = css`
  /* Merriweather */
  @import url(
    https://fonts.googleapis.com/css?family=Merriweather:700,
    400,
    400italic,
    300,
    300italic
  );
`

export { fonts, fontWeights, fontFaces }
