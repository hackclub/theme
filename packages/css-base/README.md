# @hackclub/css-base

The CSS foundation of [hackclub.com](https://hackclub.com), with no JavaScript:

- **Fonts:** Phantom Sans 0.8 (100–700, with italics) and Zarathustra as
  self-hosted woff2 files
- **Element defaults:** body, headings in Zarathustra, links, code, focus
  rings, selection
- **Prose:** `.hc-prose` for long-form HTML
- **Utilities:** `.hc-display`, `.hc-title`, `.hc-heading`, `.hc-kicker`,
  `.hc-lead`, `.hc-gradient-text`, `.hc-container`, `.hc-section`,
  `.hc-grid-paper`, `.hc-sr-only`, `.hc-skip-link`

```sh
bun add @hackclub/css-base
```

```css
@import '@hackclub/css-base'; /* tokens + fonts + base + prose */

/* or pick parts (base and prose need the tokens) */
@import '@hackclub/tokens/tokens.css';
@import '@hackclub/css-base/fonts.css';
@import '@hackclub/css-base/base.css';
```

The font files are Hack Club’s brand typefaces and are not covered by this
package’s MIT license.
