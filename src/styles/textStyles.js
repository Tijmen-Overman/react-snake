// @flow

import { css } from 'styled-components'
import { fonts } from './styleGuide'
import { mqFrom } from './mediaQueries'

// Text styles
const textStyles = {
  general: css`
    font-family: ${fonts.primary};
    font-size: 18px;
    font-style: normal;
    line-height: 32px;

    ${mqFrom.M`
      font-size: 20px;
      line-height: 36px;
    `};
  `,
  pageTitle: css`
    font-family: ${fonts.primary};
    font-size: 36px;
    font-style: normal;
    font-weight: normal;
    line-height: 52px;
  `,
  h1: css`
    font-family: ${fonts.primary};
    font-size: 20px;
    font-style: normal;
    font-weight: normal;
    line-height: 24px;
  `,
  h2: css`
    font-family: ${fonts.primary};
    font-size: 26px;
    font-style: normal;
    font-weight: normal;

    line-height: 32px;
  `,
  h3: css`
    font-family: ${fonts.primary};
    font-size: 18px;
    font-style: normal;
    font-weight: normal;
    line-height: 24px;
  `,
  link: css`
    font-family: ${fonts.primary};
    font-size: 18px;
    font-style: normal;
    font-weight: normal;
    line-height: 32px;
  `,
  metaData: css`
    font-family: ${fonts.primary};
    font-size: 16px;
    font-style: normal;
    font-weight: normal;
    line-height: 16px;
  `,
  footer: css`
    font-family: ${fonts.primary};
    font-size: 14px;
    font-style: normal;
    font-weight: normal;
    line-height: 14px;
  `
}

export { textStyles }
