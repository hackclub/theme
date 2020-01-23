import React from 'react'
import { Global as Emotion } from '@emotion/core'
import Fonts from './fonts'

const Global = ({ fonts = true }) => (
  <React.Fragment>
    {fonts && <Fonts />}
    <Emotion styles={theme => ({ body: theme.styles.root })} />
  </React.Fragment>
)

export default Global
