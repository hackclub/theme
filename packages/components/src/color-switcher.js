import { useColorMode } from 'theme-ui'
import Icon from '@hackclub/icons'
import NavButton from './nav-button'

const inverse = mode => (mode === 'dark' ? 'light' : 'dark')

const ColorSwitcher = props => {
  const [mode, setMode] = useColorMode()
  return (
    <NavButton
      {...props}
      onClick={() => setMode(inverse(mode))}
      title={`Switch to ${inverse(mode)}`}
      children={props.children || <Icon glyph="sticker" size={24} />}
    />
  )
}

export default ColorSwitcher
