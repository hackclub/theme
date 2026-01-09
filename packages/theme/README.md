# @doctordatadata/theme

[Theme UI](https://theme-ui.com) theme for BioX projects

```bash
yarn add @doctordatadata/theme
# npm i @doctordatadata/theme
```

## Usage

```js
import { ThemeProvider } from 'theme-ui'
import theme from '@doctordatadata/theme'

export default ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
```

### Fonts

This package also bundles 3 CSS files that include webfonts:
`reg.css`, `reg-bold.css`, & `reg-ital-bold.css`.
To use, just import straight from the package:

```js
import '@doctordatadata/theme/fonts/reg-bold.css'
```

(In a Next.js project, [place](https://nextjs.org/docs/basic-features/built-in-css-support) in the `pages/_app.js` file.)

MIT License
