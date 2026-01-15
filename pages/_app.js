import * as React from 'react'
import NextApp from 'next/app'

import '@doctordatadata/theme/fonts/reg-ital-bold.css'
import theme from '@doctordatadata/theme'
import retroTheme from '@doctordatadata/theme/retro'
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
