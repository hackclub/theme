# @hackclub/theme

Hack Club's design system in one package: the [tokens](../tokens), the
[base CSS and fonts](../css-base) and every [web component](../components),
styled after [hackclub.com](https://hackclub.com).

**Docs: [theme.hackclub.com](https://theme.hackclub.com)**

## CDN

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@hackclub/theme@2/dist/hackclub.css"
/>
<script
  type="module"
  src="https://unpkg.com/@hackclub/theme@2/dist/hackclub.js"
></script>
```

## npm

```sh
bun add @hackclub/theme
```

```js
import '@hackclub/theme/css' // tokens, fonts, element defaults, prose
import '@hackclub/theme' // registers every <hc-*> element

// or import components one by one
import '@hackclub/theme/components/button'

// tokens and theme helpers are exported too
import { palette, setTheme, themeScript } from '@hackclub/theme'
```

| Export                         | Contents                                      |
| ------------------------------ | --------------------------------------------- |
| `@hackclub/theme`              | Tokens + components (ESM)                     |
| `@hackclub/theme/css`          | Tokens, fonts, base and prose CSS in one file |
| `@hackclub/theme/tokens.css`   | Only the custom properties                    |
| `@hackclub/theme/tailwind.css` | Tailwind CSS v4 `@theme`                      |
| `@hackclub/theme/fonts.css`    | Only the `@font-face` rules                   |
| `@hackclub/theme/components/*` | Individual components                         |
| `@hackclub/theme/cdn`          | Self-contained bundle, Lit included           |

## Upgrading from v1

v1 was a [Theme UI](https://theme-ui.com) theme for the previous
hackclub.com, and v2 replaces it. If you depend on it, pin `@hackclub/theme@^1`.
See the [migration notes](https://theme.hackclub.com/getting-started/#migrating).
