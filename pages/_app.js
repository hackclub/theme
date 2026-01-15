import * as React from 'react'
import NextApp from 'next/app'

import '@bio-x/theme/fonts/reg-ital-bold.css'
import theme from '@bio-x/theme'
import retroTheme from '@bio-x/theme/retro'
import { ThemeProvider } from 'theme-ui'
import { ThemeStyleProvider, useThemeStyle } from '../components/theme-context'

function ThemedApp({ Component, pageProps }) {
  const { themeStyle } = useThemeStyle()
  const activeTheme = themeStyle === 'retro' ? retroTheme : theme

  return (
    <ThemeProvider theme={activeTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeStyleProvider>
        <ThemedApp Component={Component} pageProps={pageProps} />
      </ThemeStyleProvider>
    )
  }
}
