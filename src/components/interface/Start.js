// @flow
import React from 'react'

// Styling
import styled from 'styled-components'
import colors from '../../styles/colors'
import { textStyles } from '../../styles/textStyles'

// Components
import Button from './Button'
import Overlay from './Overlay'

// Types
type Props = {
  onClick: () => void
}

const Start = (props: Props) => {
  return (
    <Overlay>
      <Title>Welkom!</Title>
      <Content>
        Klaar voor Snake? Gebruik de pijltjestoetsen of raak het scherm aan om
        de Snake te sturen. Klik op de knop om te beginnen!
      </Content>
      <Button onClick={props.onClick}>Start spel</Button>
    </Overlay>
  )
}

export default Start

const Title = styled.h1`
  margin: 0 0 10px;

  ${textStyles.heading};
`

const Content = styled.p`
  margin: 0 0 20px;
  color: ${colors.black};
`
