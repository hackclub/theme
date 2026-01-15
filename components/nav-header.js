import React, { useState } from 'react'
import { Box, Container, Flex, NavLink, Text } from 'theme-ui'
import ColorSwitcher from './color-switcher'

const NavHeader = () => {
  const [spinning, setSpinning] = useState(false)

  const handleLogoClick = () => {
    setSpinning(true)
    setTimeout(() => setSpinning(false), 600)
  }

  return (
    <Box
      as="nav"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        bg: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        '@media (prefers-color-scheme: dark)': {
          bg: 'rgba(23, 23, 29, 0.95)'
        }
      }}
    >
      <Container>
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 3,
            gap: 3
          }}
        >
          {/* Logo */}
          <Text
            onClick={handleLogoClick}
            sx={{
              fontSize: 3,
              fontWeight: 'bold',
              color: 'primary',
              cursor: 'pointer',
              transition: 'transform 0.6s ease',
              transform: spinning ? 'rotate(360deg)' : 'rotate(0deg)',
              userSelect: 'none'
            }}
          >
            🎨 BioX
          </Text>

          {/* Navigation Links */}
          <Flex
            sx={{
              gap: [2, 3],
              alignItems: 'center',
              display: ['none', 'flex']
            }}
          >
            <NavLink
              href="#components-section"
              sx={{
                color: 'text',
                textDecoration: 'none',
                fontWeight: 'body',
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: 'primary'
                }
              }}
            >
              Components
            </NavLink>
            <NavLink
              href="#colors-section"
              sx={{
                color: 'text',
                textDecoration: 'none',
                fontWeight: 'body',
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: 'primary'
                }
              }}
            >
              Colors
            </NavLink>
            <NavLink
              href="https://github.com/dr-data/biox-theme"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'text',
                textDecoration: 'none',
                fontWeight: 'body',
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: 'primary'
                }
              }}
            >
              GitHub
            </NavLink>
          </Flex>

          {/* Theme Controls */}
          <Box sx={{ position: 'relative' }}>
            <ColorSwitcher sx={{ position: 'static' }} />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default NavHeader
