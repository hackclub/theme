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
        bg: 'background',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
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
              href="#buttons-section"
              sx={{
                color: 'text',
                textDecoration: 'none',
                fontWeight: 'body',
                fontSize: 1,
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: 'primary'
                }
              }}
            >
              Buttons
            </NavLink>
            <NavLink
              href="#cards-section"
              sx={{
                color: 'text',
                textDecoration: 'none',
                fontWeight: 'body',
                fontSize: 1,
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: 'primary'
                }
              }}
            >
              Cards
            </NavLink>
            <NavLink
              href="#forms-section"
              sx={{
                color: 'text',
                textDecoration: 'none',
                fontWeight: 'body',
                fontSize: 1,
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: 'primary'
                }
              }}
            >
              Forms
            </NavLink>
            <NavLink
              href="#alerts-section"
              sx={{
                color: 'text',
                textDecoration: 'none',
                fontWeight: 'body',
                fontSize: 1,
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: 'primary'
                }
              }}
            >
              Alerts
            </NavLink>
            <NavLink
              href="#badges-section"
              sx={{
                color: 'text',
                textDecoration: 'none',
                fontWeight: 'body',
                fontSize: 1,
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: 'primary'
                }
              }}
            >
              Badges
            </NavLink>
            <NavLink
              href="#colors-section"
              sx={{
                color: 'text',
                textDecoration: 'none',
                fontWeight: 'body',
                fontSize: 1,
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: 'primary'
                }
              }}
            >
              Colors
            </NavLink>
            <NavLink
              href="https://docs.biox-theme.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'text',
                textDecoration: 'none',
                fontWeight: 'body',
                fontSize: 1,
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: 'primary'
                }
              }}
            >
              Documentation
            </NavLink>
            <NavLink
              href="https://github.com/dr-data/biox-theme"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'text',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: 1,
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
