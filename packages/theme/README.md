# @bio-x/theme

[Theme UI](https://theme-ui.com) theme for BioX projects

```bash
yarn add @bio-x/theme
# npm i @bio-x/theme
```

## Usage

### Default Theme

```js
import { ThemeProvider } from 'theme-ui'
import theme from '@bio-x/theme'

export default ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
```

### Retro Theme (Mac OS9 Inspired)

The retro theme features a Mac OS9/Classic Macintosh aesthetic with 3D beveled borders, hard pixel shadows, and gradient backgrounds.

```js
import { ThemeProvider } from 'theme-ui'
import { retroTheme } from '@bio-x/theme'
// or: import retroTheme from '@bio-x/theme/retro'

export default ({ children }) => (
  <ThemeProvider theme={retroTheme}>{children}</ThemeProvider>
)
```

**Retro Theme Features:**
- 3D beveled borders (raised and inset effects)
- Hard pixel shadows (no blur)
- Mac OS9 Platinum color scheme (light mode) and dark navy (dark mode)
- Sharp border radii (2-8px)
- Gradient backgrounds on buttons and cards
- Both `retro` and `retroDark` color modes

### Fonts

This package also bundles 3 CSS files that include webfonts:
`reg.css`, `reg-bold.css`, & `reg-ital-bold.css`.
To use, just import straight from the package:

```js
import '@bio-x/theme/fonts/reg-bold.css'
```

(In a Next.js project, [place](https://nextjs.org/docs/basic-features/built-in-css-support) in the `pages/_app.js` file.)

MIT License
