# Hack Club design system

[![format](https://github.com/hackclub/theme/workflows/format/badge.svg)](https://github.com/hackclub/theme/actions/workflows/format.yml)
[![test](https://github.com/hackclub/theme/workflows/test/badge.svg)](https://github.com/hackclub/theme/actions/workflows/test.yml)

The design system behind [Hack Club](https://hackclub.com)'s website, available as tokens, CSS and web components. Works with any framework, or none at all.

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@hackclub/theme@2/dist/hackclub.css"
/>
<script
  type="module"
  src="https://unpkg.com/@hackclub/theme@2/dist/hackclub.js"
></script>

<hc-button arrow>Join Hack Club</hc-button>
```

**[Documentation → design.hackclub.com](https://design.hackclub.com)**

## Packages

| Package                                       | What it is                                                                   |
| --------------------------------------------- | ---------------------------------------------------------------------------- |
| [`@hackclub/theme`](packages/theme)           | Everything in one install, plus a single-file CDN bundle                     |
| [`@hackclub/tokens`](packages/tokens)         | Design tokens as JS, JSON, CSS custom properties and a Tailwind CSS v4 theme |
| [`@hackclub/css-base`](packages/css-base)     | Phantom Sans & Zarathustra, element defaults, prose styles, utility classes  |
| [`@hackclub/components`](packages/components) | Web components (`<hc-button>`, `<hc-nav>`, `<hc-footer>`…) built with Lit    |
| [`@hackclub/meta`](packages/meta)             | React component for generating social tags for `<head>`                      |

> Looking for the Theme UI theme for the previous version of hackclub.com?
> It's `@hackclub/theme@1` on npm, and in [this repo's history](https://github.com/hackclub/theme/tree/v1.2.1) before v2.

## Development

This is a [Bun](https://bun.sh) workspace managed with [Lerna](https://lerna.js.org).

```sh
bun install          # also builds every package
bun run build        # rebuild packages (in dependency order)
bun run test         # unit tests (happy-dom)
bun run test:e2e     # clean build, tests, dist smoke test and docs build
bun run docs:dev     # design.hackclub.com on localhost
```

The docs site in [`/docs`](docs) is built with [Astro](https://astro.build) and deployed on Vercel.
It imports the built packages, so run `bun run build` after changing a package.

## License

Code is MIT.
The Phantom Sans and Zarathustra font files in `packages/css-base/fonts` are Hack Club's brand typefaces, taken from hackclub.com, and are not covered by the MIT license.
