# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BioX Theme is a Theme UI-based design system for React applications, organized as a Yarn workspaces monorepo with Lerna.

**Packages:**
- `@doctordatadata/theme` - Theme UI base theme with colors, typography, components
- `@doctordatadata/meta` - React component for generating social/meta tags

**Documentation Site:** Next.js app at project root, deployed on Vercel

## Development Commands

```bash
# Setup
yarn install              # Install all dependencies
yarn prepare              # Build all packages (Lerna + Microbundle)

# Testing & Quality
yarn test                 # Run Jest tests (packages/*/test/*.js)
yarn format               # Format code with Prettier
yarn checkFormat          # Check Prettier formatting

# Documentation Site
yarn dev                  # Start Next.js dev server
yarn build                # Build Next.js site
yarn start                # Start production Next.js server

# Publishing (requires npm auth)
./publish.sh              # Build, test, and publish both packages to npm
```

## Architecture

### Monorepo Structure
```
packages/
├── theme/              # @doctordatadata/theme
│   ├── src/
│   │   ├── index.ts   # Main theme export (TypeScript)
│   │   └── prism.ts   # Prism syntax highlighting theme
│   └── fonts/         # Phantom Sans CSS font files
│       ├── reg.css
│       ├── reg-bold.css
│       ├── reg-ital-bold.css
│       └── noto-sans-chinese.css
│
└── meta/               # @doctordatadata/meta
    ├── src/index.js   # Meta component export
    └── test/          # Jest snapshot tests

pages/                  # Next.js docs site
├── _app.js            # ThemeProvider setup
├── _document.js       # Color mode initialization
└── index.js           # Documentation page

docs/                   # Mirror of pages/ for Vercel deployment
```

### Theme Package (`@doctordatadata/theme`)

**TypeScript Theme:** Built with Microbundle, exports as CommonJS, ESM, and UMD.

**Two Theme Variants:**

#### Default Theme (`theme`)
- **Color Modes:** Light/dark with `useColorSchemeMediaQuery: true`
- **Utility Functions:**
  - `theme.util.gx(from, to)` - Radial gradient with color names
  - `theme.util.gxText(from, to)` - Gradient text with background-clip
  - CSS media query helpers (`motion`, `reduceMotion`, `supportsClipText`, etc.)
- **Responsive:** 5 breakpoints [32em, 48em, 64em, 96em, 128em]
- **Typography:** Phantom Sans font family with multiple weights
- **Components:** Complete Theme UI spec (buttons, cards, forms, badges, alerts)

#### Retro Theme (`retroTheme`)
Mac OS9/Classic Macintosh inspired theme with:
- **Color Modes:** `retro` (Platinum gray) and `retroDark` (dark navy)
- **3D Beveled Borders:** Light top/left, dark bottom/right for raised effect
- **Hard Pixel Shadows:** No blur, offset shadows (1px, 2px, 4px, 6px)
- **Sharp Border Radii:** 2px, 4px, 6px, 8px (vs rounded in default)
- **Gradient Backgrounds:** Vertical gradients on buttons and cards
- **OS9 Color Scale:** `os9BgDeep`, `os9BgMain`, `os9BgSurface`, `os9BgElevated`
- **Bevel Colors:** `bevelLight`, `bevelDark`, `bevelHighlight`, `bevelShadow`

**Usage:**
```js
// Default theme
import theme from '@doctordatadata/theme'

// Retro theme (two ways)
import { retroTheme } from '@doctordatadata/theme'
// or
import retroTheme from '@doctordatadata/theme/retro'
```

**Font Loading:**
```js
import '@doctordatadata/theme/fonts/reg-bold.css'
```

### Meta Package (`@doctordatadata/meta`)

React component for Open Graph/social meta tags:
```jsx
<Meta
  as={Head}                              // Wrapper component (optional)
  name="BioX"                            // Site name
  title="Dashboard"                      // Page title
  description="Your project description" // Description
  image="https://example.com/card.png"  // Social image
  color="#ec3750"                        // Theme color
  manifest="/site.webmanifest"          // Manifest link
/>
```

## Build System

- **Monorepo:** Lerna 3.22.1 with Yarn workspaces
- **Package Bundler:** Microbundle 0.12.4 (outputs CJS, ESM, UMD)
- **TypeScript:** ES2018 target for theme package
- **Babel:** @babel/preset-env + @babel/preset-react
- **Testing:** Jest 26.6.3 with @testing-library/react
- **Formatting:** Prettier (single quotes, no semicolons, no trailing commas)

## Code Style

**Prettier Configuration:**
- Single quotes
- No semicolons
- No trailing commas
- Arrow function parens: avoid
- Line width: 80

## Testing

Tests are in `packages/*/test/*.js` using Jest with snapshot testing. The Meta component has 5 snapshot tests covering various prop combinations.

## Deployment

The documentation site is deployed to Vercel. The `/docs` directory contains a mirror of the root Next.js app for Vercel compatibility.

## Notes

- Theme colors are defined with semantic names (e.g., `elevated`, `sunken`, `sheet`) that adapt to color modes
- The theme includes special card variants (`translucent`, `translucentDark`) with backdrop-filter support
- Chinese language support available via Noto Sans TC/SC fonts
