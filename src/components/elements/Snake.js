// @flow
import React, { Fragment } from 'react'

// Styling
import styled from 'styled-components'
import BaseElementSize from '../../styles/baseElementSize'
import colors from '../../styles/colors'

// Types
import type { ISegments, ISegmentSize } from '../../types/types'
type Props = {
  direction: string,
  segments: ISegments,
  segmentSize: ISegmentSize
}

const getBodyAngle = (prev: string, current: string, next: string) => {
  const topLeft = [
    'right-up-up',
    'right-up-right',
    'right-up-down',
    'down-left-left',
    'down-left-down',
    'down-left-up'
  ]
  const topRight = [
    'down-right-right',
    'down-right-up',
    'down-right-down',
    'left-up-up',
    'left-up-left',
    'left-up-right'
  ]
  const bottomRight = [
    'left-down-down',
    'left-down-left',
    'left-down-right',
    'up-right-right',
    'up-right-up',
    'up-right-down'
  ]
  const bottomLeft = [
    'up-left-left',
    'up-left-up',
    'up-left-down',
    'right-down-down',
    'right-down-right',
    'right-down-left'
  ]

  const checkValue = `${prev}-${current}-${next}`
  if (topLeft.includes(checkValue)) {
    return 'topLeft'
  } else if (topRight.includes(checkValue)) {
    return 'topRight'
  } else if (bottomRight.includes(checkValue)) {
    return 'bottomRight'
  } else if (bottomLeft.includes(checkValue)) {
    return 'bottomLeft'
  } else {
    return 'straight'
  }
}

const Snake = (props: Props) => {
  const { direction, segments, segmentSize } = props
  return (
    <Fragment>
      {segments.map((item, i) => {
        const x = item.y * segmentSize.height
        const y = item.x * segmentSize.width
        if (i === 0) {
          return (
            <Head
              key={`snake-head`}
              width={segmentSize.width}
              height={segmentSize.height}
              direction={direction}
              style={{ top: `${x}px`, left: `${y}px` }}
            />
          )
        } else if (i === segments.length - 1) {
          return (
            <Tail
              key={`snake-tail-${i}`}
              width={segmentSize.width}
              height={segmentSize.height}
              direction={segments[segments.length - 2].direction}
              style={{ top: `${x}px`, left: `${y}px` }}
            />
          )
        } else {
          const prevDirection = segments[i - 1].direction
          const nextDirection = segments[i + 1].direction
          const angle = getBodyAngle(
            prevDirection,
            item.direction,
            nextDirection
          )

          return (
            <Body
              key={`snake-body-${i}`}
              width={segmentSize.width}
              height={segmentSize.height}
              angle={angle}
              style={{ top: `${x}px`, left: `${y}px` }}
            />
          )
        }
      })}
    </Fragment>
  )
}

export default Snake

const Head = styled.div`
  ${BaseElementSize};
  border-radius: ${props =>
    props.direction === 'up'
      ? '5px 5px 0 0'
      : props.direction === 'down'
      ? '0 0 5px 5px'
      : props.direction === 'left'
      ? '5px 0 0 5px'
      : '0 5px 5px 0'};
  background-color: ${colors.apple};
`

const Body = styled.div`
  ${BaseElementSize};
  border-radius: ${props =>
    props.angle === 'topLeft'
      ? '5px 0 0 0'
      : props.angle === 'topRight'
      ? '0 5px 0 0'
      : props.angle === 'bottomRight'
      ? '0 0 5px 0'
      : props.angle === 'bottomLeft'
      ? '0 0 0 5px'
      : '0 0 0 0'};
  background-color: ${colors.apple};
`

const Tail = styled.div`
  ${BaseElementSize};
  border-radius: ${props =>
    props.direction === 'up'
      ? '0 0 20px 20px'
      : props.direction === 'down'
      ? '20px 20px 0 0'
      : props.direction === 'left'
      ? '0 20px 20px 0'
      : '20px 0 0 20px'};
  background-color: ${colors.apple};
`
