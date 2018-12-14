// @flow
import React from 'react'

// Styling
import styled from 'styled-components'
import colors from '../../styles/colors'
import { textStyles } from '../../styles/textStyles'

// Components
import Button from './Button'

// Types
type Props = {
  onClick: () => void
}

const Start = (props: Props) => {
  return (
    <Container>
      <Title>Welcome!</Title>
      <Content>
        Are you ready to play Snake? Use the arrow keys or press the screen to
        change the direction of the snake. Click the button below to start
        playing!
      </Content>
      <Button onClick={props.onClick}>Start Game</Button>
    </Container>
  )
}

export default Start

const Container = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(100% - 40px);
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid ${colors.black};
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  color: ${colors.black};
  box-shadow: 6px 6px 0 0 rgba(0, 0, 0, 1);
`

const Title = styled.h1`
  margin: 0 0 10px;

  ${textStyles.heading};
`

const Content = styled.p`
  margin: 0 0 20px;
  color: ${colors.black};
`
