// @flow
import React from 'react'

// Styling
import styled from 'styled-components'

// Types
type Props = {
  direction: string,
  highlight: boolean
}

const Arrow = (props: Props) => {
  const color = `rgba(0, 0, 0, 0.1)`
  return (
    <Container highlight={props.highlight}>
      <SVG
        direction={props.direction}
        viewBox={'0 0 12 14'}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.5 0v14l11-7z" fill={color} fillRule="evenodd" />
      </SVG>
    </Container>
  )
}

export default Arrow

const Container = styled.div`
  width: 30px;
  height: 30px;
  transition: opacity 300ms ease;
  opacity: ${props => (props.highlight ? 1 : 0)};
`

const SVG = styled.svg`
  transform: ${props =>
    props.direction === 'up'
      ? `rotate(-90deg)`
      : props.direction === 'down'
      ? `rotate(90deg)`
      : props.direction === 'left'
      ? `rotate(-180deg)`
      : `rotate(0deg)`};
`
