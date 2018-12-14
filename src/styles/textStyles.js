// @flow

import { css } from 'styled-components'
import { fonts } from './fonts'
import { mqFrom } from './mediaQueries'

// Text styles
const textStyles = {
  general: css`
    font-family: ${fonts.PressStart};
    font-size: 14px;
    font-style: normal;
    line-height: 2;

    ${mqFrom.M`
      font-size: 16px;
      line-height: 2;
    `};
  `,
  heading: css`
    font-family: ${fonts.PressStart};
    font-size: 18px;
    font-style: normal;
    line-height: 2;

    ${mqFrom.M`
      font-size: 24px;
      line-height: 2;
    `};
  `
}

export { textStyles }
