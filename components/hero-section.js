import React from 'react'
import { Box, Container, Heading, Text, Button, Flex } from 'theme-ui'
import { useThemeStyle } from './theme-context'
import { useClickCounter, triggerConfetti } from './easter-eggs'

const HeroSection = () => {
  const { themeStyle } = useThemeStyle()
  const themeName = themeStyle === 'retro' ? 'Retro (Mac OS9)' : 'Modern'

  const { handleClick } = useClickCounter(5, () => {
    triggerConfetti()
  })

  return (
    <Box
      sx={{
        backgroundImage: t => t.util.gx('orange', 'red'),
        color: 'white',
        py: [4, 5],
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container>
        <Heading
          variant="ultratitle"
          onClick={handleClick}
          sx={{
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)'
            },
            '&:active': {
              transform: 'scale(0.95)'
            }
          }}
        >
          BioX Theme
        </Heading>
        <Text
          as="p"
          sx={{
            fontSize: [3, 4],
            fontWeight: 'body',
            mt: 3,
            mb: 4,
            maxWidth: '600px',
            mx: 'auto',
            opacity: 0.9
          }}
        >
          {themeStyle === 'retro'
            ? 'Experience the nostalgic Mac OS9 aesthetic with 3D beveled borders and hard pixel shadows'
            : 'A beautiful, modern theme system for Theme UI with smooth gradients and elegant animations'}
        </Text>
        <Flex
          sx={{
            gap: 3,
            justifyContent: 'center',
            flexWrap: 'wrap',
            mt: 4
          }}
        >
          <Button
            variant="primary"
            sx={{
              bg: 'white',
              color: 'purple',
              '&:hover': {
                bg: 'rgba(255, 255, 255, 0.9)'
              }
            }}
            onClick={() => {
              document.getElementById('components-section')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Explore Components
          </Button>
          <Button
            variant="outline"
            sx={{
              borderColor: 'white',
              color: 'white',
              '&:hover': {
                bg: 'rgba(255, 255, 255, 0.1)'
              }
            }}
            as="a"
            href="https://github.com/dr-data/biox-theme"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </Button>
        </Flex>
        <Text
          sx={{
            fontSize: 0,
            mt: 4,
            opacity: 0.6,
            fontStyle: 'italic'
          }}
        >
          💡 Tip: Click the title 5 times for a surprise!
        </Text>
      </Container>
    </Box>
  )
}

export default HeroSection
