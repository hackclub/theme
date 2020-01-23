import React from 'react'
import { useColorMode, Box, Container } from 'theme-ui'

import Link from 'next/link'
import { useRouter } from 'next/router'
import Icon from '@hackclub/icons'

import Flag from './flag'
import NavButton from './nav-button'
import ColorSwitcher from './color-switcher'

const Back = ({ to = '/' }) => (
  <Link href={to} passHref>
    <NavButton as="a" title={to === '/' ? 'Back to homepage' : 'Back'}>
      <Icon glyph="view-back" />
    </NavButton>
  </Link>
)

const Nav = ({ back = true, sx = {}, ...props }) => {
  const [mode] = useColorMode()
  const router = useRouter()
  const home = router.pathname === '/'
  return (
    <Box
      as="nav"
      sx={{
        bg: mode === 'dark' ? 'darkless' : 'snow',
        py: 3,
        ...sx
      }}
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          a: {
            fontSize: 1,
            color: 'primary',
            textDecoration: 'none',
            ':first-of-type': { mr: 'auto' },
            ':not:first-of-type': { mr: [3, 4] }
          }
        }}
      >
        {!home && back ? <Back /> : <Flag />}
        {children}
        <ColorSwitcher />
      </Container>
    </Box>
  )
}

export default Nav
