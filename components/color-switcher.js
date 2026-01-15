import React from 'react'
import { Box, Button, Flex, IconButton, useColorMode } from 'theme-ui'
import { useThemeStyle } from './theme-context'

const ColorSwitcher = props => {
  const [mode, setMode] = useColorMode()
  const { themeStyle, setThemeStyle } = useThemeStyle()

  return (
    <Flex
      sx={{
        position: 'absolute',
        top: 3,
        right: 3,
        gap: 2,
        alignItems: 'center'
      }}
      {...props}
    >
      {/* Theme Style Toggle */}
      <Flex sx={{
        border: '2px solid',
        borderColor: 'primary',
        borderRadius: 'circle',
        overflow: 'hidden'
      }}>
        <Button
          onClick={() => setThemeStyle('default')}
          title="Switch to Default theme"
          sx={{
            bg: themeStyle === 'default' ? 'primary' : 'transparent',
            color: themeStyle === 'default' ? 'white' : 'text',
            borderRadius: 0,
            px: 3,
            py: 1,
            fontSize: 1,
            fontWeight: 'bold',
            cursor: 'pointer',
            border: 'none',
            transition: 'all 0.2s ease',
            '&:hover': {
              bg: themeStyle === 'default' ? 'primary' : 'sunken'
            }
          }}
        >
          Default
        </Button>
        <Button
          onClick={() => setThemeStyle('retro')}
          title="Switch to Retro (Mac OS9) theme"
          sx={{
            bg: themeStyle === 'retro' ? 'primary' : 'transparent',
            color: themeStyle === 'retro' ? 'white' : 'text',
            borderRadius: 0,
            px: 3,
            py: 1,
            fontSize: 1,
            fontWeight: 'bold',
            cursor: 'pointer',
            border: 'none',
            transition: 'all 0.2s ease',
            '&:hover': {
              bg: themeStyle === 'retro' ? 'primary' : 'sunken'
            }
          }}
        >
          Retro
        </Button>
      </Flex>

      {/* Color Mode Toggle */}
      <IconButton
        onClick={() => {
          // Handle different color mode names for different themes
          if (themeStyle === 'retro') {
            setMode(mode === 'retroDark' ? 'retro' : 'retroDark')
          } else {
            setMode(mode === 'dark' ? 'light' : 'dark')
          }
        }}
        title="Toggle dark mode"
        sx={{
          color: 'primary',
          borderRadius: 'circle',
          transition: 'box-shadow .125s ease-in-out',
          ':hover,:focus': {
            boxShadow: '0 0 0 2px',
            outline: 'none'
          }
        }}
      >
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
      </IconButton>
    </Flex>
  )
}

export default ColorSwitcher
