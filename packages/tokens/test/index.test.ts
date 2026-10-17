import { test, expect } from 'bun:test'
import tokens, {
  palette,
  colors,
  cssVar,
  kebab,
  staticDeclarations,
  toCSS,
  toTailwindCSS
} from '../src'

const propertyNames = (lines: string[]) =>
  lines.map(line => line.trim().split(':')[0])

test('brand palette matches hackclub.com', () => {
  expect(palette.red).toBe('#ec3750')
  expect(palette.orange).toBe('#ff8c37')
  expect(palette.blue).toBe('#338eda')
  expect(tokens.palette).toBe(palette)
})

test('light and dark schemes define the same keys', () => {
  expect(Object.keys(colors.dark).sort()).toEqual(
    Object.keys(colors.light).sort()
  )
})

test('custom property names are unique', () => {
  const statics = propertyNames(staticDeclarations())
  const scheme = Object.keys(colors.light).map(k => `--hc-${kebab(k)}`)
  const all = [...statics, ...scheme]
  expect(new Set(all).size).toBe(all.length)
})

test('kebab and cssVar', () => {
  expect(kebab('surfaceHover')).toBe('surface-hover')
  expect(kebab('2xl')).toBe('2xl')
  expect(cssVar('surfaceHover')).toBe('var(--hc-surface-hover)')
})

test('toCSS emits tokens and color scheme rules', () => {
  const css = toCSS()
  expect(css).toContain('--hc-red: #ec3750;')
  expect(css).toContain('--hc-radius-card: 16px;')
  expect(css).toContain('@media (prefers-color-scheme: dark)')
  expect(css).toContain(':root.dark')
  expect(css).toContain('[data-theme="dark"]')
  expect(css).toContain(`--hc-background: ${colors.dark.background};`)
  // Balanced braces
  expect(css.split('{').length).toBe(css.split('}').length)
})

test('toTailwindCSS maps namespaces to --hc- variables', () => {
  const css = toTailwindCSS()
  expect(css).toContain('@theme inline {')
  expect(css).toContain('--color-hc-red: var(--hc-red);')
  expect(css).toContain('--color-hc-surface-hover: var(--hc-surface-hover);')
  expect(css).toContain('--font-display: var(--hc-font-display);')
  expect(css).toContain('--radius-card: var(--hc-radius-card);')
  expect(css).toContain('--shadow-popover: var(--hc-shadow-popover);')
  expect(css).not.toContain('--color-hc-shadow')
  expect(css).toContain('--breakpoint-lg: 64rem;')
})
