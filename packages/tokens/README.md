# @hackclub/tokens

Design tokens from [hackclub.com](https://hackclub.com): colors (with light
and dark schemes), typography, spacing, radii, shadows, gradients and motion.

```sh
bun add @hackclub/tokens
```

## CSS custom properties

```css
@import '@hackclub/tokens/tokens.css';

.card {
  background: var(--hc-surface);
  border-radius: var(--hc-radius-card);
  font-family: var(--hc-font-display);
}
```

Semantic colors (`--hc-background`, `--hc-foreground`, `--hc-surface`,
`--hc-muted`, `--hc-red-text`…) follow `prefers-color-scheme`. You can
override them with `html.dark`, or with `data-theme="light|dark"` (or
`.hc-light` / `.hc-dark`) on any element.

## Tailwind CSS v4

```css
@import 'tailwindcss';
@import '@hackclub/tokens/tailwind.css';
```

Then use `bg-hc-surface`, `text-hc-red-text`, `font-display`, `rounded-card`,
`shadow-raised` and so on.

## JavaScript & JSON

```js
import { palette, colors, fonts, radii, cssVar, toCSS } from '@hackclub/tokens'

palette.red // '#ec3750'
cssVar('surfaceHover') // 'var(--hc-surface-hover)'
```

`@hackclub/tokens/tokens.json` has the same data for other tools.

Full reference: [theme.hackclub.com/tokens](https://theme.hackclub.com/tokens/)
