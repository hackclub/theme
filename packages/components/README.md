# @hackclub/components

Framework-agnostic web components for Hack Club's design system, built with
[Lit](https://lit.dev). They work in plain HTML, React 19, Vue, Svelte, Astro,
or anything else that renders HTML.

```sh
bun add @hackclub/components @hackclub/css-base
```

```js
import '@hackclub/css-base' // fonts and tokens
import '@hackclub/components' // registers everything
// or: import '@hackclub/components/button'
```

```html
<hc-nav sticky>
  <a href="/clubs">Clubs</a>
  <hc-nav-menu label="About">
    <a href="/team">Team</a>
  </hc-nav-menu>
  <hc-button slot="cta" size="sm">Join</hc-button>
</hc-nav>
```

| Group       | Elements                                                                                                                                        |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Core        | `hc-button` `hc-card` `hc-badge` `hc-input` `hc-email-signup` `hc-heading` `hc-kicker` `hc-gradient-text` `hc-container` `hc-section` `hc-icon` |
| Site chrome | `hc-nav` `hc-nav-menu` `hc-footer` `hc-footer-column` `hc-theme-toggle`                                                                         |
| Motifs      | `hc-polaroid` `hc-sticker` `hc-wave` `hc-grid-paper`                                                                                            |
| Content     | `hc-prose` `hc-callout` `hc-code`                                                                                                               |

## Icons

`<hc-icon>` renders any glyph from [icons.hackclub.com](https://icons.hackclub.com).
Only the few glyphs the components use are bundled; others load from
icons.hackclub.com as a CSS mask. To embed all of them:

```js
import '@hackclub/components/icons'
```

## Dark mode

```js
import { themeScript, setTheme } from '@hackclub/components/theme'
// Inline themeScript in <head> to apply the saved theme before first paint
```

Docs and live examples: [design.hackclub.com/components](https://design.hackclub.com/components/)
