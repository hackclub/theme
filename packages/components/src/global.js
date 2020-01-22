import { Fragment } from 'react'
import { Global as Emotion } from '@emotion/core'
import Fonts from './fonts'

const Global = ({ fonts = true }) => (
  <Fragment>
    {fonts && <Fonts />}
    <Emotion styles={theme => ({ body: theme.styles.root })} />
  </Fragment>
)

export default Global
