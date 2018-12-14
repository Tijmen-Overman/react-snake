// @flow
import React from 'react'

// Styling
import styled from 'styled-components'
import BaseElementSize from '../../styles/baseElementSize'

// Types
import type { IFoodItem, ISegmentSize } from '../../types/types'
type Props = {
  snack: IFoodItem,
  segmentSize: ISegmentSize
}

const Food = (props: Props) => {
  const { snack, segmentSize } = props
  return (
    <Item
      x={snack.coord.x}
      y={snack.coord.y}
      width={segmentSize.width}
      height={segmentSize.height}
    >
      {snack.item}
    </Item>
  )
}

export default Food

const Item = styled.div`
  ${BaseElementSize};
  top: ${props => `${props.y * props.height}px`};
  left: ${props => `${props.x * props.width}px`};
  align-items: center;
  display: flex;
  font-size: ${props => `${props.width}px`};
  line-height: 1;
`
