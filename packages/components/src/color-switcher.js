import React from 'react'
import { useColorMode } from 'theme-ui'
import NavButton from './nav-button'

const inverse = mode => (mode === 'dark' ? 'light' : 'dark')

const ColorSwitcher = props => {
  const [mode, setMode] = useColorMode()
  return (
    <NavButton
      onClick={() => setMode(inverse(mode))}
      title={`Switch to ${inverse(mode)}`}
      {...props}
    />
  )
}

export default ColorSwitcher
