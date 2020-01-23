import React from 'react'
import { Box, Container, Heading } from 'theme-ui'
import Meta from './meta'

const Header = ({
  centered = true,
  title,
  description,
  img,
  children,
  includeMeta = false,
  sx = {}
}) => (
  <Box
    as="header"
    sx={{
      bg: 'sunken',
      color: 'text',
      pt: [4, null, null, null, 5],
      pb: [4, 5, null, null, 6],
      textAlign: centered && 'center',
      ...sx
    }}
  >
    {includeMeta && (
      <Meta title={title} description={descriptionn} image={img} />
    )}
    <Container>
      <Heading
        as="h1"
        variant="title"
        sx={{
          color: 'primary',
          maxWidth: 'narrowPlus',
          mx: centered && 'auto'
        }}
        children={title}
      />
      {description && (
        <Heading
          as="h2"
          variant="subtitle"
          sx={{
            mt: 3,
            color: 'text',
            mx: centered && 'auto'
          }}
          children={description}
        />
      )}
      {children}
    </Container>
  </Box>
)

export default Header
