import { IconButton, useColorMode } from 'theme-ui'

const ColorSwitcher = () => {
  const [mode, setMode] = useColorMode()
  const nextMode = mode === 'dark' ? 'light' : 'dark'
  return (
    <IconButton
      onClick={() => setMode(nextMode)}
      title={`Switch to ${nextMode} mode`}
      aria-label={`Switch to ${nextMode} mode`}
      sx={{
        position: 'absolute',
        top: 3,
        right: 3,
        color: 'primary',
        borderRadius: 'circle',
        transition: 'box-shadow .125s ease-in-out',
        ':hover,:focus': {
          boxShadow: '0 0 0 2px',
          outline: 'none'
        }
      }}
    >
      {mode === 'dark' ? (
        <svg viewBox="0 0 32 32" width="24" height="24" fill="currentcolor">
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="currentcolor"
            strokeWidth="4"
          />
          <path d="M 16 0 A 16 16 0 0 0 16 32 z" />
        </svg>
      ) : (
        <svg viewBox="0 0 32 32" width="24" height="24" fill="currentcolor">
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="currentcolor"
            strokeWidth="4"
          />
          <path d="M 16 0 A 16 16 0 0 1 16 32 z" />
        </svg>
      )}
    </IconButton>
  )
}

export default ColorSwitcher
