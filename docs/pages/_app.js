import NextApp from 'next/app'

import '@hackclub/theme/fonts/reg-ital-bold.css'
import theme from '@hackclub/theme'
import { ThemeUIProvider } from 'theme-ui'

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeUIProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeUIProvider>
    )
  }
}
