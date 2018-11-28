import { css } from 'styled-components'

// these sizes are arbitrary and you can set them to whatever you wish
const sizes = {
  XL: 1440,
  L: 1024,
  M: 768,
  S: 600,
  XS: 320
}

// iterate through the sizes and create a media template
const mqFrom = Object.keys(sizes).reduce(
  (mediaQuery, label) => {
    // use em in breakpoints to work properly cross-browser and support users
    // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
    const emSize = sizes[label] / 16
    mediaQuery[label] = (...args) =>
      css`
        @media (min-width: ${emSize}em) {
          ${css(...args)}
        }
      ` /* prettier-ignore */
    return mediaQuery
  },
  {
    px: px => (...args) =>
      css`
        @media (min-width: ${px}px) {
          ${css(...args)}
        }
      ` /* prettier-ignore */
  }
)

// iterate through the sizes and create a media template
const mqTo = Object.keys(sizes).reduce(
  (mediaQuery, label) => {
    // use em in breakpoints to work properly cross-browser and support users
    // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
    const emSize = (sizes[label] - 1) / 16
    mediaQuery[label] = (...args) =>
      css`
        @media (max-width: ${emSize}em) {
          ${css(...args)}
        }
      ` /* prettier-ignore */
    return mediaQuery
  },
  {
    px: px => (...args) =>
      css`
        @media (max-width: ${px}px) {
          ${css(...args)}
        }
      ` /* prettier-ignore */
  }
)

export { sizes, mqFrom, mqTo }
