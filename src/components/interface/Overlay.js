// @flow
import React, { type Node } from 'react'

// Styling
import styled from 'styled-components'
import colors from '../../styles/colors'

// Types
type Props = {
  children: Node
}

const Overlay = (props: Props) => {
  return (
    <Container>
      <Content>{props.children}</Content>
    </Container>
  )
}

export default Overlay

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`

const Content = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9;
  width: calc(100% - 40px);
  max-width: 500px;
  padding: 20px;
  border: 1px solid ${colors.black};
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  color: ${colors.black};
  box-shadow: 6px 6px 0 0 rgba(0, 0, 0, 1);
`
