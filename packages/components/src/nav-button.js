import React from 'react'
import { IconButton } from 'theme-ui'

const NavButton = ({ sx, ...props }) => (
  <IconButton
    {...props}
    sx={{
      color: 'primary',
      borderRadius: 'circle',
      transition: 'box-shadow .125s ease-in-out',
      ':hover,:focus': {
        boxShadow: '0 0 0 2px',
        outline: 'none'
      },
      ...sx
    }}
  />
)

export default NavButton
