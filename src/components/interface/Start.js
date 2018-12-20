// @flow
import React from 'react'

// Styling
import styled from 'styled-components'
import colors from '../../styles/colors'
import { textStyles } from '../../styles/textStyles'

// Components
import Button from './Button'
import Overlay from './Overlay'

// Types
type Props = {
  onClick: () => void
}

const Start = (props: Props) => {
  return (
    <Overlay>
      <Title>Welcome!</Title>
      <Content>
        Are you ready to play Snake? Use the arrow keys or press the screen to
        change the direction of the snake. Click the button below to start
        playing!
      </Content>
      <Button onClick={props.onClick}>Start Game</Button>
    </Overlay>
  )
}

export default Start

const Title = styled.h1`
  margin: 0 0 10px;

  ${textStyles.heading};
`

const Content = styled.p`
  margin: 0 0 20px;
  color: ${colors.black};
`
