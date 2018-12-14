// @flow

// Types
import type { ICoord, IFoodItem, ISegments } from '../types/types'

const isOpposite = (
  newDirection: string,
  currentDirection: string
): boolean => {
  return (
    (currentDirection === 'down' && newDirection === 'up') ||
    (currentDirection === 'up' && newDirection === 'down') ||
    (currentDirection === 'left' && newDirection === 'right') ||
    (currentDirection === 'right' && newDirection === 'left')
  )
}

const isOutOfBounds = (coord: ICoord): boolean => {
  return coord.x < 0 || coord.x > 24 || coord.y < 0 || coord.y > 24
}

const isEatingFood = (coord: ICoord, food: IFoodItem): boolean => {
  return coord.x === food.coord.x && coord.y === food.coord.y
}

const isBitingTail = (head: ICoord, segments: ISegments): boolean => {
  const match = segments.find(item => item.x === head.x && item.y === head.y)
  return match !== undefined
}

export { isOpposite, isOutOfBounds, isEatingFood, isBitingTail }
