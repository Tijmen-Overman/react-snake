// @flow
import React, { Component } from 'react'

// Styling
import styled, { css } from 'styled-components'

// Types
type Coord = {
  x: number,
  y: number
}
type Bounds = {
  minY: number,
  minX: number,
  maxY: number,
  maxX: number
}
type FoodItem = {
  item: string,
  coord: Coord
}
type Segment = {
  width: number,
  height: number
}

type State = {
  direction: string,
  segments: Array<Coord>,
  segmentSize: Segment,
  bounds: Bounds,
  started: boolean,
  paused: boolean,
  food: FoodItem,
  score: number,
  message: string
}

class Game extends Component<*, State> {
  state = {
    direction: 'up',
    segments: [{ x: 12, y: 12 }, { x: 12, y: 13 }, { x: 12, y: 14 }],
    segmentSize: {
      width: window.innerWidth / 25,
      height: window.innerHeight / 25
    },
    food: {
      item: '🍣',
      coord: { x: 0, y: 0 }
    },
    bounds: {
      minY: 0,
      minX: 0,
      maxY: window.innerHeight,
      maxX: window.innerWidth
    },
    started: false,
    paused: false,
    score: 0,
    message: ''
  }
  timer = null
  speed = 250
  directions = [
    { direction: 'up', keyCode: 38 },
    { direction: 'down', keyCode: 40 },
    { direction: 'left', keyCode: 37 },
    { direction: 'right', keyCode: 39 }
  ]
  foodOptions = ['🍣', '🍔', '🍤', '🍟', '🥛', '🍺']

  handleKey(e: SyntheticKeyboardEvent<HTMLInputElement>) {
    // Up: 38 // Down: 40 // Left:  37 // Right:  39 // Space: 32
    const match = this.directions.find(item => item.keyCode === e.keyCode)
    if (match) {
      this.changeDirection(match.direction)
    } else if (e.keyCode === 32) {
      this.togglePause()
    }
  }

  isOpposite(newDirection: string): boolean {
    const { direction } = this.state
    return (
      (direction === 'down' && newDirection === 'up') ||
      (direction === 'up' && newDirection === 'down') ||
      (direction === 'left' && newDirection === 'right') ||
      (direction === 'right' && newDirection === 'left')
    )
  }

  isOutOfBounds(coord: Coord): boolean {
    return coord.x < 0 || coord.x > 24 || coord.y < 0 || coord.y > 24
  }

  isEatingFood(coord: Coord): boolean {
    const { food } = this.state
    return coord.x === food.coord.x && coord.y === food.coord.y
  }

  isBitingTail(coord: Coord): boolean {
    const { segments } = this.state
    const match = segments.find(
      item => item.x === coord.x && item.y === coord.y
    )
    return match !== undefined
  }

  changeDirection(direction: string) {
    if (!this.isOpposite(direction)) {
      this.setState({
        direction: direction
      })
    }
  }

  changeCoords() {
    const { segments, direction } = this.state
    let newSegments = segments.map((item, i) => {
      if (i === 0) {
        switch (direction) {
          case 'up':
            return { x: item.x, y: item.y - 1 }
          case 'down':
            return { x: item.x, y: item.y + 1 }
          case 'left':
            return { y: item.y, x: item.x - 1 }
          case 'right':
          default:
            return { y: item.y, x: item.x + 1 }
        }
      }
      return segments[i - 1]
    })

    if (this.isEatingFood(newSegments[0])) {
      newSegments[newSegments.length] = newSegments[segments.length - 1]
      this.toggleFood()
      this.updateScore()
    }
    if (this.isOutOfBounds(newSegments[0])) {
      this.togglePause()
      this.showMessage(`You've run into a wall.\nYou've lost!`)
    } else if (this.isBitingTail(newSegments[0])) {
      this.togglePause()
      this.showMessage(`OUCH! You bit your own tail.\nYou've lost!`)
    } else {
      this.setState({
        segments: newSegments
      })
    }
  }

  startGame() {
    this.setState({ started: true })
    this.toggleFood()
    this.togglePause()
  }

  togglePause() {
    const { started, paused } = this.state
    if (started) {
      if (!paused) {
        this.timer && clearInterval(this.timer)
        this.showMessage(`Paused game...`)
      } else {
        this.timer = setInterval(() => {
          this.handleMovement()
        }, this.speed)
        this.hideMessage()
      }
      this.setState({
        paused: !paused
      })
    }
  }

  showMessage(whatHappened: string) {
    const { score } = this.state
    const message = `${whatHappened}\nYou scored ${score} points!`
    this.setState({
      message
    })
  }

  hideMessage() {
    this.setState({ message: '' })
  }

  handleReplay() {
    this.resetGame()
  }

  handleMovement() {
    this.changeCoords()
  }

  toggleFood() {
    const randomFood = Math.floor(Math.random() * this.foodOptions.length)
    const foodItem = this.foodOptions[randomFood]
    const foodCoord = this.getRandomCoords()

    this.setState({
      food: { item: foodItem, coord: foodCoord }
    })
  }

  updateScore() {
    this.setState({
      score: this.state.score + 1
    })
  }

  getRandomCoords() {
    const x = Math.floor(Math.random() * 24)
    const y = Math.floor(Math.random() * 24)

    return { x: x, y: y }
  }

  resetGame() {
    this.setState({
      direction: 'up',
      segments: [{ x: 12, y: 12 }, { x: 12, y: 13 }, { x: 12, y: 14 }],
      message: ''
    })
    this.togglePause()
  }

  componentDidMount() {
    window.addEventListener('keydown', e => this.handleKey(e))
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', e => this.handleKey(e))
  }

  render() {
    const {
      direction,
      segments,
      segmentSize,
      food,
      message,
      started
    } = this.state

    return (
      <Container>
        {segments.map((item, i) => {
          if (i === 0) {
            return (
              <Head
                key={`snake-head`}
                x={item.x}
                y={item.y}
                width={segmentSize.width}
                height={segmentSize.height}
                direction={direction}
              />
            )
          } else if (i === segments.length - 1) {
            return (
              <Tail
                key={`snake-tail-${i}`}
                x={item.x}
                y={item.y}
                width={segmentSize.width}
                height={segmentSize.height}
                direction={direction}
              />
            )
          } else {
            return (
              <Body
                key={`snake-tail-${i}`}
                x={item.x}
                y={item.y}
                width={segmentSize.width}
                height={segmentSize.height}
              />
            )
          }
        })}
        <Food
          x={food.coord.x}
          y={food.coord.y}
          width={segmentSize.width}
          height={segmentSize.height}
        >
          {food.item}
        </Food>
        {!started && (
          <Start>
            <Button onClick={() => this.startGame()}>Start Game</Button>
          </Start>
        )}
        {message && (
          <Message>
            <Text>{message}</Text>
            <Button onClick={() => this.handleReplay()}>Replay</Button>
          </Message>
        )}
      </Container>
    )
  }
}

export default Game

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;
`

const Sizing = css`
  box-sizing: border-box;
  position: absolute;
  top: ${props => `${props.y * props.height}px`};
  left: ${props => `${props.x * props.width}px`};
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
`

const Head = styled.div`
  ${Sizing};
  border-radius: ${props =>
    props.direction === 'up'
      ? '5px 5px 0 0'
      : props.direction === 'down'
      ? '0 0 5px 5px'
      : props.direction === 'left'
      ? '5px 0 0 5px'
      : '0 5px 5px 0'};
  background-color: red;
`

const Body = styled.div`
  ${Sizing};
  background-color: green;
`

const Tail = styled.div`
  ${Sizing};
  border-radius: ${props =>
    props.direction === 'up'
      ? '0 0 20px 20px'
      : props.direction === 'down'
      ? '20px 20px 0 0'
      : props.direction === 'left'
      ? '0 20px 20px 0'
      : '20px 0 0 20px'};
  background-color: blue;
`

const Food = styled.div`
  ${Sizing};
  align-items: center;
  display: flex;
  font-size: ${props => `${props.width}px`};
  line-height: 1;
`

const Message = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: calc(100% - 40px);
  padding: 10px;
  background-color: white;
  color: black;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
`

const Text = styled.span`
  color: black;
`

const Button = styled.button`
  border: 1px solid red;
`

const Start = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: 50%;
  left: 20px;
  width: calc(100% - 40px);
  padding: 10px;
  transform: translateY(-50%);
  background-color: white;
  color: black;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
`
