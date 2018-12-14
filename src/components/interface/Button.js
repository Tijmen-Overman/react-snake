// @flow
import React, { type Node } from 'react'

// Styling
import styled from 'styled-components'
import colors from '../../styles/colors'
import animation from '../../styles/animation'

// Types
type Props = {
  children: Node,
  onClick: () => void
}

const Button = (props: Props) => {
  return <Container onClick={props.onClick}>{props.children}</Container>
}

export default Button

const Container = styled.button`
  display: block;
  padding: 5px;
  border: 1px solid ${colors.black};
  transition: transform ${animation.fast.speed} ${animation.fast.easing},
    box-shadow ${animation.fast.speed} ${animation.fast.easing};
  background-color: ${colors.white};
  color: ${colors.black};
  box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 1);
  cursor: pointer;

  &:hover {
    transform: translate(3px, 3px);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  }
`
