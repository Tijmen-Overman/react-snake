// @flow
import React from 'react'
import styled from 'styled-components'

// Components
import Game from '../Game'

const Home = () => (
  <Wrapper>
    <Game />
  </Wrapper>
)

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

export default Home
