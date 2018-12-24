// @flow
import React, { Component } from 'react'

// Utils
import { isOpposite } from '../../services/checks'

// Styling
import styled from 'styled-components'

// Components
import Arrow from './Arrow'

// Type
type Props = {
  currentDirection: string,
  ended: boolean,
  highlighted: boolean,
  changeDirection: (newDirection: string) => void,
  togglePause: () => void
}

class Directions extends Component<Props> {
  directions = [
    { direction: 'up', keyCode: 38 },
    { direction: 'down', keyCode: 40 },
    { direction: 'left', keyCode: 37 },
    { direction: 'right', keyCode: 39 }
  ]

  handleKey(e: SyntheticKeyboardEvent<HTMLInputElement>) {
    const { ended, changeDirection, togglePause } = this.props
    // Up: 38 // Down: 40 // Left:  37 // Right:  39 // Space: 32
    const match = this.directions.find(item => item.keyCode === e.keyCode)
    if (match && !ended) {
      changeDirection(match.direction)
    } else if (e.keyCode === 32) {
      togglePause()
    }
  }

  handleTouch = (e: SyntheticTouchEvent<HTMLElement>, newDirection: string) => {
    const { ended, changeDirection, currentDirection } = this.props
    if (
      !ended &&
      newDirection !== undefined &&
      !isOpposite(newDirection, currentDirection)
    ) {
      changeDirection(newDirection)
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', e => this.handleKey(e))
    window.addEventListener('touchstart', (e, direction) =>
      this.handleTouch(e, direction)
    )
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', e => this.handleKey(e))
    window.removeEventListener('touchstart', (e, direction) =>
      this.handleTouch(e, direction)
    )
  }

  render() {
    const { highlighted } = this.props
    return (
      <Container>
        <Direction
          onClick={(e, direction) => this.handleTouch(e, 'up')}
          direction={'up'}
          highlight={highlighted}
        >
          <Arrow direction={'up'} highlight={highlighted} />
        </Direction>
        <Direction
          onClick={(e, direction) => this.handleTouch(e, 'left')}
          direction={'left'}
          highlight={highlighted}
        >
          <Arrow direction={'left'} highlight={highlighted} />
        </Direction>
        <Direction
          onClick={(e, direction) => this.handleTouch(e, 'right')}
          direction={'right'}
          highlight={highlighted}
        >
          <Arrow direction={'right'} highlight={highlighted} />
        </Direction>
        <Direction
          onClick={(e, direction) => this.handleTouch(e, 'down')}
          direction={'down'}
          highlight={highlighted}
        >
          <Arrow direction={'down'} highlight={highlighted} />
        </Direction>
      </Container>
    )
  }
}

export default Directions

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  flex-flow: row wrap;
  display: flex;
  width: 100%;
  height: 100%;
`

const Direction = styled.div`
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  display: flex;
  width: ${props =>
    props.direction === 'up' || props.direction === 'down' ? '100%' : '50%'};
  transition: box-shadow 300ms linear;
  box-shadow: ${props =>
    props.highlight
      ? `0 0 0 1px rgba(0, 0, 0, 0.1)`
      : `0 0 0 0 rgba(0, 0, 0, 0.1)`};
`
