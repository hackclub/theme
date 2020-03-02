import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  NavLink,
  Heading,
  Text,
  Card,
  Grid,
  Label,
  Textarea
} from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import theme from '@hackclub/theme'
import ColorSwitcher from '../components/color-switcher'
import { TypeScale, ColorPalette } from '@theme-ui/style-guide'

export default () => (
  <>
    <Head>
      <title>Hack Club Theme</title>
      <Meta
        name="Theme"
        description="Hack Club’s theme + React components for Theme UI"
      />
    </Head>
    <Box as="header" sx={{ bg: 'sheet', color: 'text' }}>
      <Container sx={{ pt: [4, 5], pb: [3, 4] }}>
        <ColorSwitcher />
        <Heading as="h1" variant="title" sx={{ textAlign: 'center' }}>
          <Text
            as="span"
            sx={{
              WebkitTextStroke: 'currentColor',
              WebkitTextStrokeWidth: '2px',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Hack Club
          </Text>{' '}
          <Text as="span">Theme</Text>
        </Heading>
        <Grid
          gap={4}
          columns="auto auto"
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 2,
            mt: 3,
            mb: 4,
            a: { color: 'muted', transition: 'color .125s ease-in-out' }
          }}
        >
          <NavLink href="https://github.com/hackclub/theme">GitHub</NavLink>
          <NavLink href="https://npmjs.com/package/@hackclub/theme">
            npm
          </NavLink>
        </Grid>
      </Container>
      <Box as="main" sx={{ bg: 'background', py: 4 }}>
        {Object.keys(theme.layout).map(key => (
          <Container
            variant={key}
            sx={{ my: 3, py: 3, bg: 'sunken', borderRadius: 'default' }}
          >
            {key}
          </Container>
        ))}
        <Container variant="container" sx={{ px: 3 }}>
          {Object.keys(theme.text).map(key => {
            const Component = key.includes('head') ? Heading : Text
            return (
              <Component key={key} variant={key} sx={{ mb: 3 }}>
                {key}
              </Component>
            )
          })}
          {Object.keys(theme.buttons).map(key => (
            <Button variant={key} sx={{ mr: 3 }}>
              {key}
            </Button>
          ))}
          {Object.keys(theme.cards).map(key => (
            <Card variant={key} sx={{ my: 3 }}>
              {key}
            </Card>
          ))}
          <TypeScale />
          <ColorPalette
            omit={['modes', 'placeholder', 'twitter', 'instagram', 'facebook']}
          />
          <Text as="pre" variant="styles.pre">
            {JSON.stringify(theme, null, 2)}
          </Text>
        </Container>
      </Box>
    </Box>
  </>
)
