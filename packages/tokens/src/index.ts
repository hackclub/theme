/**
 * Hack Club design tokens, extracted from the v4 hackclub.com website.
 *
 * Every token is also exposed as a CSS custom property prefixed with `--hc-`
 * (see `tokens.css`), e.g. `palette.red` → `--hc-red`,
 * `radii.card` → `--hc-radius-card`.
 */

/** Raw brand colors. These never change between light and dark mode. */
export const palette = {
  red: '#ec3750',
  orange: '#ff8c37',
  yellow: '#f1c40f',
  green: '#33d6a6',
  cyan: '#5bc0de',
  blue: '#338eda',
  purple: '#a633d6',
  /** The brand's muted gray (named `muted` on the hackclub.com brand page) */
  gray: '#8492a6',

  /** Near-black used for text on light backgrounds and dark-mode backgrounds */
  ink: '#17171d',
  /** Deep red-tinted ink, used in brand gradients */
  ink2: '#2e1719',
  paper: '#ffffff',
  /** Warm off-white used for text in dark mode */
  cream: '#fff6eb',
  black: '#000000',

  /** Brand red darkened to pass WCAG AA (4.5:1) for small text on white */
  redDark: '#be1e3a',
  /** Brand red lightened to pass WCAG AA for small text on ink */
  redLight: '#ff5c72'
} as const

/** Semantic colors that change with the color scheme. */
export interface SchemeColors {
  /** Page background */
  background: string
  /** Default text color */
  foreground: string
  /** Raised surfaces: cards, dropdowns, inputs */
  surface: string
  /** Hovered or pressed surfaces */
  surfaceHover: string
  /** Hairline borders */
  border: string
  /** Secondary text */
  muted: string
  /** Translucent background for sticky navigation */
  navBg: string
  /** Accessible red for small text and links */
  redText: string
  /** Dropdown / popover shadow */
  shadowPopover: string
}

export const colors: { light: SchemeColors; dark: SchemeColors } = {
  light: {
    background: palette.paper,
    foreground: palette.ink,
    surface: '#f9fafc',
    surfaceHover: '#f1f2f5',
    border: 'rgba(0, 0, 0, 0.08)',
    muted: 'rgba(23, 23, 29, 0.7)',
    navBg: 'rgba(255, 255, 255, 0.82)',
    redText: palette.redDark,
    shadowPopover: '0 8px 32px rgba(0, 0, 0, 0.13)'
  },
  dark: {
    background: palette.ink,
    foreground: palette.cream,
    surface: '#1f1f27',
    surfaceHover: '#2a2a33',
    border: 'rgba(255, 255, 255, 0.08)',
    muted: 'rgba(255, 246, 235, 0.7)',
    navBg: 'rgba(23, 23, 29, 0.82)',
    redText: palette.redLight,
    shadowPopover: '0 8px 32px rgba(0, 0, 0, 0.6)'
  }
}

export const fonts = {
  /** Phantom Sans: body copy, UI, navigation, buttons */
  sans: '"Phantom Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  /** Zarathustra: the serif display face used for every heading */
  display: 'Zarathustra, "Iowan Old Style", Georgia, serif',
  mono: 'ui-monospace, "SF Mono", "Roboto Mono", Menlo, Consolas, monospace'
} as const

export const fontWeights = {
  thin: 100,
  light: 300,
  book: 350,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700
} as const

/**
 * Type scale. v4 uses a 20px body size, 40px section headings and fluid
 * display sizes for heroes.
 */
export const fontSizes = {
  xs: '0.8rem',
  sm: '1rem',
  md: '1.125rem',
  body: '1.25rem',
  lg: '1.5rem',
  xl: '2rem',
  heading: '2.5rem',
  title: 'clamp(2.2rem, 4vw, 3.4rem)',
  display: 'clamp(3.25rem, 12vw, 5.625rem)'
} as const

export const lineHeights = {
  display: 0.92,
  heading: 1,
  snug: 1.2,
  normal: 1.5,
  prose: 1.7
} as const

export const letterSpacings = {
  display: '-0.02em',
  normal: '0',
  kicker: '0.26em'
} as const

/** Spacing scale in px, keyed by multiples of 4 (Tailwind-style). */
export const space = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  32: '128px'
} as const

export const radii = {
  sm: '6px',
  md: '8px',
  /** Polaroid photos */
  photo: '10px',
  /** Dropdowns and popovers */
  lg: '12px',
  /** The default card radius */
  card: '16px',
  xl: '24px',
  /** Large showcase cards */
  '2xl': '28px',
  /** Buttons, inputs, badges — v4 uses pills everywhere */
  pill: '9999px'
} as const

export const shadows = {
  card: '0 2px 16px rgba(0, 0, 0, 0.1)',
  raised: '0 20px 50px rgba(91, 52, 18, 0.08)',
  photo: '0 4px 20px rgba(0, 0, 0, 0.18)',
  pill: '0 10px 28px rgba(23, 23, 29, 0.08)',
  glow: '0 5px 16px rgba(236, 55, 80, 0.4)',
  /** Hard offset shadow used on logos and stickers */
  offset: '2px 2px 0 #000',
  /** Use with `filter: drop-shadow(...)` on cut-out stickers */
  sticker: '0 2px 4px rgba(0, 0, 0, 0.12)',
  stickerHover: '0 8px 16px rgba(0, 0, 0, 0.28)',
  focus: '0 0 0 3px rgba(236, 55, 80, 0.25)'
} as const

export const gradients = {
  /** Red → orange, used for highlighted words */
  brand: `linear-gradient(90deg, ${palette.red} 0%, ${palette.orange} 100%)`,
  /** Darker red → orange that keeps contrast on light backgrounds */
  brandDeep: 'linear-gradient(90deg, #b3203d 0%, #d96b1d 100%)',
  /** The animated rainbow from the homepage hero */
  rainbow: `repeating-linear-gradient(105deg, ${palette.red} 0%, ${palette.orange} 16%, ${palette.yellow} 32%, ${palette.green} 48%, ${palette.blue} 64%, ${palette.purple} 80%, ${palette.red} 100%)`,
  /** Ink → red, used behind brand heroes */
  ink: `linear-gradient(135deg, ${palette.ink} 0%, ${palette.ink2} 45%, ${palette.red} 100%)`,
  /** Soft red wash at the bottom of heroes */
  redWash:
    'linear-gradient(180deg, rgba(236, 55, 80, 0.04) 60%, rgba(236, 55, 80, 0.4) 100%)'
} as const

export const easings = {
  /** Snappy ease-out for navigation and menus */
  out: 'cubic-bezier(0.23, 1, 0.32, 1)',
  /** Gentle, playful ease for photos and stickers */
  playful: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  standard: 'ease'
} as const

export const durations = {
  fast: '150ms',
  base: '200ms',
  medium: '300ms',
  slow: '400ms'
} as const

/** Breakpoints in px. CSS can't use custom properties in media queries, so use these values directly. */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1200
} as const

export const layout = {
  maxWidth: '1200px',
  proseWidth: '800px',
  navHeight: '80px',
  gutter: 'clamp(16px, 6vw, 80px)',
  sectionY: 'clamp(80px, 12vw, 160px)'
} as const

export const tokens = {
  palette,
  colors,
  fonts,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacings,
  space,
  radii,
  shadows,
  gradients,
  easings,
  durations,
  breakpoints,
  layout
} as const

export type Tokens = typeof tokens
export type PaletteColor = keyof typeof palette

/** Convert a camelCase token key to kebab-case, e.g. `surfaceHover` → `surface-hover`. */
export const kebab = (key: string): string =>
  key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

/**
 * Return a `var(--hc-…)` reference for a token path.
 *
 * @example cssVar('red') // 'var(--hc-red)'
 * @example cssVar('radius-card') // 'var(--hc-radius-card)'
 */
export const cssVar = (name: string): string => `var(--hc-${kebab(name)})`

const declarations = (
  prefix: string,
  values: Record<string, string | number>
) =>
  Object.entries(values).map(
    ([key, value]) => `  --hc-${prefix}${kebab(key)}: ${value};`
  )

const schemeDeclarations = (scheme: SchemeColors) =>
  declarations('', { ...scheme })

/** Static (scheme-independent) custom property declarations. */
export const staticDeclarations = (): string[] => [
  ...declarations('', palette),
  ...declarations('font-', fonts),
  ...declarations('weight-', fontWeights),
  ...declarations('text-', fontSizes),
  ...declarations('leading-', lineHeights),
  ...declarations('tracking-', letterSpacings),
  ...declarations('space-', space),
  ...declarations('radius-', radii),
  ...declarations('shadow-', shadows),
  ...declarations('gradient-', gradients),
  ...declarations('ease-', easings),
  ...declarations('duration-', durations),
  ...declarations('', {
    maxWidth: layout.maxWidth,
    proseWidth: layout.proseWidth,
    navHeight: layout.navHeight,
    gutter: layout.gutter,
    sectionY: layout.sectionY
  })
]

/**
 * Build the full token stylesheet.
 *
 * Color scheme resolution, in order of precedence:
 * 1. `data-theme="light|dark"` or `.hc-light` / `.hc-dark` on any element
 *    (scopes the scheme to that subtree).
 * 2. `html.dark` (compatible with hackclub.com and Tailwind's `dark` class).
 * 3. The visitor's `prefers-color-scheme`.
 */
export const toCSS = (): string => {
  const light = schemeDeclarations(colors.light)
  const dark = schemeDeclarations(colors.dark)
  return [
    '/* @hackclub/tokens — generated, do not edit */',
    ':root {',
    ...staticDeclarations(),
    '}',
    '',
    ':root, [data-theme="light"], .hc-light {',
    ...light,
    '  color-scheme: light;',
    '}',
    '',
    '@media (prefers-color-scheme: dark) {',
    '  :root:not([data-theme="light"]):not(.light) {',
    ...dark.map(line => `  ${line}`),
    '    color-scheme: dark;',
    '  }',
    '}',
    '',
    ':root.dark, :root[data-theme="dark"], [data-theme="dark"], .hc-dark {',
    ...dark,
    '  color-scheme: dark;',
    '}',
    ''
  ].join('\n')
}

/**
 * Build a Tailwind CSS v4 `@theme` block that maps Tailwind's namespaces to
 * the `--hc-` custom properties (so utilities like `bg-hc-red`, `font-display`
 * and `rounded-card` follow light/dark mode automatically).
 */
export const toTailwindCSS = (): string => {
  const map = (ns: string, keys: string[], source: (k: string) => string) =>
    keys.map(key => `  --${ns}-${kebab(key)}: var(--hc-${source(kebab(key))});`)
  return [
    '/* @hackclub/tokens — Tailwind CSS v4 theme. Import after "tailwindcss". */',
    '@import "./tokens.css";',
    '',
    '@theme inline {',
    ...map('color-hc', Object.keys(palette), k => k),
    ...map(
      'color-hc',
      Object.keys(colors.light).filter(k => k !== 'shadowPopover'),
      k => k
    ),
    ...map('font', Object.keys(fonts), k => `font-${k}`),
    ...map('text', Object.keys(fontSizes), k => `text-${k}`),
    ...map('radius', Object.keys(radii), k => `radius-${k}`),
    ...map('shadow', [...Object.keys(shadows), 'popover'], k => `shadow-${k}`),
    ...map('ease', Object.keys(easings), k => `ease-${k}`),
    ...Object.entries(breakpoints).map(
      ([key, value]) => `  --breakpoint-${key}: ${value / 16}rem;`
    ),
    '}',
    ''
  ].join('\n')
}

export default tokens
