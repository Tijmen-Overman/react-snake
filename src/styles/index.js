// @flow

// Global stylesheet
import { createGlobalStyle, css } from 'styled-components'
import styledNormalize from 'styled-normalize'

// Styling
import colors from '../styles/colors'
import { fontFaces } from '../styles/fonts'
import { textStyles } from './textStyles'

export const styles = css`
  ${styledNormalize}
  ${fontFaces}

  html,
  body {
    width: 100%;
    height: 100%;
    background-color: ${colors.white};
    color: ${colors.black};

    ${textStyles.general};
  }

  #root {
    width: 100%;
    height: 100%;
  }
`

const GlobalStyle = createGlobalStyle`
  ${styles}
`

export default GlobalStyle
