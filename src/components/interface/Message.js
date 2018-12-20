// @flow
import React from 'react'

// Styling
import styled from 'styled-components'
import colors from '../../styles/colors'

// Components
import Button from './Button'

// Types
type Props = {
  text: string,
  score: number,
  paused: boolean,
  ended: boolean,
  onClick: () => void
}

const Message = (props: Props) => (
  <Container>
    <Text>
      {props.text}
      {props.ended && <Score>{`You scored ${props.score} points.`}</Score>}
    </Text>
    <Button onClick={props.onClick}>
      {props.paused ? 'Continue' : 'Replay'}
    </Button>
  </Container>
)

export default Message

const Container = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 9;
  width: calc(100% - 40px);
  max-width: 500px;
  padding: 10px;
  border: 1px solid ${colors.black};
  background-color: ${colors.white};
  color: ${colors.black};
  box-shadow: 6px 6px 0 0 rgba(0, 0, 0, 1);
`

const Text = styled.span`
  display: block;
  color: ${colors.black};
`

const Score = styled.span`
  display: block;
`
