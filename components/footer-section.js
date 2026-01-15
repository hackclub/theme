import React, { useEffect, useState } from 'react'
import { Box, Container, Flex, Link, Text } from 'theme-ui'

const FooterSection = () => {
  const [showEmoji, setShowEmoji] = useState(false)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    let hasScrolledPast = false

    const handleScroll = () => {
      const footer = document.getElementById('footer-section')
      if (!footer) return

      const rect = footer.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      // Check if scrolled past footer
      if (rect.bottom < viewportHeight / 2 && !hasScrolledPast) {
        hasScrolledPast = true
        setShowEmoji(true)
        // Bounce back
        window.scrollTo({
          top: document.documentElement.scrollHeight - viewportHeight,
          behavior: 'smooth'
        })
        // Hide emoji after 2 seconds
        setTimeout(() => setShowEmoji(false), 2000)
      }

      // Reset when scrolling back up
      if (rect.top > 0) {
        hasScrolledPast = false
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Box
      id="footer-section"
      as="footer"
      sx={{
        bg: 'sheet',
        borderTop: '1px solid',
        borderColor: 'border',
        py: 5,
        mt: 6,
        position: 'relative'
      }}
    >
      <Container>
        {/* Links Section */}
        <Flex
          sx={{
            gap: 4,
            justifyContent: 'center',
            flexWrap: 'wrap',
            mb: 4
          }}
        >
          <Link
            href="https://github.com/dr-data/biox-theme"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text',
              textDecoration: 'none',
              fontWeight: 'bold',
              '&:hover': {
                color: 'primary'
              }
            }}
          >
            GitHub
          </Link>
          <Link
            href="https://www.npmjs.com/package/@bio-x/theme"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text',
              textDecoration: 'none',
              fontWeight: 'bold',
              '&:hover': {
                color: 'primary'
              }
            }}
          >
            NPM
          </Link>
          <Link
            href="https://theme-ui.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text',
              textDecoration: 'none',
              fontWeight: 'bold',
              '&:hover': {
                color: 'primary'
              }
            }}
          >
            Theme UI Docs
          </Link>
        </Flex>

        {/* Credits */}
        <Text
          sx={{
            textAlign: 'center',
            fontSize: 1,
            color: 'muted',
            mb: 2
          }}
        >
          Made with ❤️ using{' '}
          <Link href="https://theme-ui.com" target="_blank" rel="noopener noreferrer" sx={{ color: 'primary' }}>
            Theme UI
          </Link>
        </Text>

        {/* Copyright */}
        <Text
          sx={{
            textAlign: 'center',
            fontSize: 0,
            color: 'muted'
          }}
        >
          © {currentYear} Dr Data. MIT License.
        </Text>

        {/* Easter Egg Emoji */}
        {showEmoji && (
          <Text
            sx={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 6,
              animation: 'bounce 0.5s ease-in-out',
              '@keyframes bounce': {
                '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
                '50%': { transform: 'translateX(-50%) translateY(-20px)' }
              }
            }}
          >
            👋
          </Text>
        )}

        {/* Hidden Tip */}
        <Text
          sx={{
            textAlign: 'center',
            fontSize: 0,
            color: 'muted',
            mt: 3,
            opacity: 0.5,
            fontStyle: 'italic'
          }}
        >
          💡 Try scrolling past the footer!
        </Text>
      </Container>
    </Box>
  )
}

export default FooterSection
