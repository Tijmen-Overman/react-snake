// @flow
import React from 'react'

// Styling
import styled from 'styled-components'

// Types
type Props = {
  speed: number,
  score: number,
  paused: boolean,
  ended: boolean,
  direction: string
}

const Stats = (props: Props) => {
  const { speed, score, paused, ended, direction } = props
  return (
    <Container>
      <span>speed: {speed}</span>
      <span>score: {score}</span>
      <span>state: {paused ? `paused` : ended ? `ended` : `playing`}</span>
      <span>direction: {direction}</span>
    </Container>
  )
}

export default Stats

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;

  background-color: rgba(0, 0, 0, 0.1);

  span {
    display: block;
    font-size: 10px;
  }
`
