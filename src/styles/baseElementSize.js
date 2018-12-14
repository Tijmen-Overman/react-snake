// @flow

// Styling
import { css } from 'styled-components'

const ElementSize = css`
  box-sizing: border-box;
  position: absolute;
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
`

export default ElementSize
