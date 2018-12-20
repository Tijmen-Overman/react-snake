// @flow
import React, { Fragment } from 'react'

// Styling
import styled from 'styled-components'
import { textStyles } from '../../styles/textStyles'

// Components
import Button from './Button'
import Overlay from './Overlay'

// Types
type Props = {
  paused: boolean,
  score: number,
  togglePause: () => void
}

const Pause = (props: Props) => {
  return (
    <Fragment>
      <PauseButton onClick={props.togglePause}>||</PauseButton>
      {props.paused && (
        <Overlay>
          <Title>* Paused *</Title>
          <Score>Your score:{props.score}</Score>
          <ContinueButton onClick={props.togglePause}>Resume</ContinueButton>
        </Overlay>
      )}
    </Fragment>
  )
}

export default Pause

const PauseButton = styled(Button)`
  position: absolute;
  top: 20px;
  right: 20px;
`

const Title = styled.h3`
  margin: 0 0 10px;
  text-align: center;

  ${textStyles.heading};
`

const Score = styled.div`
  margin: 0 0 10px;
`

const ContinueButton = styled(Button)`
  width: 100%;
`
