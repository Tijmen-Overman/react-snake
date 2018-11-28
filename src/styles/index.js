// @flow

// Global stylesheet
import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'

// Styling
import { colors } from '../styles/styleGuide'
import { textStyles } from './textStyles'

export const styles = `
  ${styledNormalize}

  html,
  body {
    width: 100%;
    height: 100%;
    ${textStyles.general};
    background-color: ${colors.blueWhale};
    color: ${colors.white};
  }

  #root {
    width: 100%;
    height: 100%;
  }

  a {
    color: ${colors.white};
  }
`

const GlobalStyle = createGlobalStyle`
  ${styles}
`

export default GlobalStyle
