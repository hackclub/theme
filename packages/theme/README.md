# @hackclub/theme

[Theme UI](https://theme-ui.com) theme for [Hack Club](https://hackclub.com)

```sh
npm i @hackclub/theme
```

## Usage

```js
import { ThemeProvider } from 'theme-ui'
import { theme } from '@hackclub/theme'

export default ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
```
