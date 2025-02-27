// @flow
import React, { Component } from 'react'

// Utils
import {
  isOpposite,
  isOutOfBounds,
  isEatingFood,
  isBitingTail
} from '../services/checks'
import getRandomCoords from '../services/getRandomCoords'

// Styling
import styled from 'styled-components'

// Components
import Message from './interface/Message'
import Start from './interface/Start'
import Directions from './interface/Directions'
import Snake from './elements/Snake'
import Food from './elements/Food'
import Pause from './interface/Pause'
// import Stats from './stats/Stats'

// Types
import type {
  ISegments,
  ISegmentSize,
  IBounds,
  IFoodItem
} from '../types/types'

type State = {
  direction: string,
  segments: ISegments,
  segmentSize: ISegmentSize,
  bounds: IBounds,
  started: boolean,
  paused: boolean,
  ended: boolean,
  food: IFoodItem,
  score: number,
  speed: number,
  message: ?string
}

class Game extends Component<*, State> {
  state = {
    direction: 'up',
    segments: [
      { direction: 'up', x: 12, y: 12 },
      { direction: 'up', x: 12, y: 13 },
      { direction: 'up', x: 12, y: 14 }
    ],
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
    ended: false,
    score: 0,
    speed: 250,
    message: null
  }
  timer = null
  foodOptions = [
    '🍇',
    '🍉',
    '🍊',
    '🍋',
    '🍌',
    '🍎',
    '🍐',
    '🍒',
    '🍓',
    '🥝',
    '🥑',
    '🥔',
    '🥕',
    '🌽',
    '🥦',
    '🥐',
    '🥨',
    '🥞',
    '🧀',
    '🍖',
    '🥓',
    '🍔',
    '🍟',
    '🍕',
    '🌮',
    '🍿',
    '🍙',
    '🍣',
    '🍤',
    '🍦',
    '🍩',
    '🍪',
    '🍫',
    '🍭',
    '🍷',
    '🍺'
  ]

  changeDirection = (newDirection: string) => {
    const { direction } = this.state
    if (!isOpposite(newDirection, direction)) {
      this.setState({
        direction: newDirection
      })
    }
  }

  changeCoords = () => {
    const { segments, food, direction } = this.state
    let newSegments = segments.map((item, i) => {
      if (i === 0) {
        switch (direction) {
          case 'up':
            return { direction: 'up', x: item.x, y: item.y - 1 }
          case 'down':
            return { direction: 'down', x: item.x, y: item.y + 1 }
          case 'left':
            return { direction: 'left', y: item.y, x: item.x - 1 }
          case 'right':
          default:
            return { direction: 'right', y: item.y, x: item.x + 1 }
        }
      }
      return segments[i - 1]
    })

    if (isEatingFood(newSegments[0], food)) {
      newSegments[newSegments.length] = newSegments[segments.length - 1]
      this.toggleFood()
      this.updateScore()
    }
    if (isOutOfBounds(newSegments[0])) {
      this.endGame(`Oeps. Je hebt de muur geraakt!`)
    } else if (isBitingTail(newSegments[0], segments)) {
      this.endGame(`Auw! Je hebt op je staart gebeten.`)
    } else {
      this.setState({
        segments: newSegments
      })
    }
  }

  handleStart = () => {
    const { speed } = this.state
    this.setState({
      started: true,
      ended: false,
      paused: false
    })
    this.toggleFood()
    this.timer = setInterval(() => {
      this.handleMovement()
    }, speed)
  }

  togglePause = () => {
    const { started, paused, speed } = this.state
    if (started) {
      if (!paused) {
        this.timer && clearInterval(this.timer)
      } else {
        this.timer = setInterval(() => {
          this.handleMovement()
        }, speed)
        this.hideMessage()
      }
      this.setState({
        paused: !paused
      })
    }
  }

  endGame = (message: string) => {
    this.setState({
      ended: true,
      message
    })
  }

  handleContinue = () => {
    const { paused } = this.state
    if (paused) {
      this.togglePause()
    } else {
      this.resetGame()
    }
  }

  resetGame = () => {
    this.timer && clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.handleMovement()
    }, 250)
    this.setState({
      direction: 'up',
      segments: [
        { direction: 'up', x: 12, y: 12 },
        { direction: 'up', x: 12, y: 13 },
        { direction: 'up', x: 12, y: 14 }
      ],
      message: null,
      score: 0,
      speed: 250,
      ended: false
    })
  }

  hideMessage = () => {
    this.setState({ message: null })
  }

  handleMovement = () => {
    this.changeCoords()
  }

  toggleFood = () => {
    const randomFood = Math.floor(Math.random() * this.foodOptions.length)
    const foodItem = this.foodOptions[randomFood]
    const foodCoord = getRandomCoords()

    this.setState({
      food: { item: foodItem, coord: foodCoord }
    })
  }

  updateScore = () => {
    const score = this.state.score + 1
    if (score % 5 === 0) {
      this.updateSpeed()
    }
    this.setState({ score })
  }

  updateSpeed = () => {
    const { speed } = this.state
    this.timer && clearInterval(this.timer)
    this.setState({
      speed: speed - speed * 0.1
    })
    this.timer = setInterval(() => {
      this.handleMovement()
    }, speed)
  }

  render() {
    const {
      direction,
      segments,
      segmentSize,
      food,
      message,
      started,
      paused,
      ended,
      score
    } = this.state

    return (
      <Container>
        <Snake
          direction={direction}
          segments={segments}
          segmentSize={segmentSize}
        />
        <Food snack={food} segmentSize={segmentSize} />
        <Directions
          currentDirection={direction}
          ended={ended}
          changeDirection={this.changeDirection}
          togglePause={this.togglePause}
          highlighted={score <= 5}
        />
        {!started && <Start onClick={this.handleStart} />}
        {message && (
          <Message
            text={message}
            paused={paused}
            ended={ended}
            score={score}
            onClick={this.handleContinue}
          />
        )}
        {/* <Stats
          speed={speed}
          score={score}
          paused={paused}
          ended={ended}
          direction={direction}
        /> */}
        {started && (
          <Pause paused={paused} score={score} togglePause={this.togglePause} />
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
`
