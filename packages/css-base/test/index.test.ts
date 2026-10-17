import { test, expect } from 'bun:test'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { staticDeclarations, colors, kebab } from '@hackclub/tokens'

const root = join(import.meta.dir, '..')
const read = (file: string) => readFileSync(join(root, 'src', file), 'utf8')

test('every @font-face source exists', () => {
  const urls = [...read('fonts.css').matchAll(/url\('\.\/(fonts\/[^']+)'\)/g)]
  expect(urls.length).toBe(13)
  for (const [, file] of urls) expect(existsSync(join(root, file))).toBe(true)
})

test('stylesheets only reference defined tokens', () => {
  const defined = new Set([
    ...staticDeclarations().map(line => line.trim().split(':')[0]),
    ...Object.keys(colors.light).map(k => `--hc-${kebab(k)}`),
    // Component-level knobs
    '--hc-grid-size',
    '--hc-grid-color'
  ])
  for (const file of ['base.css', 'prose.css']) {
    for (const [, name] of read(file).matchAll(/var\((--hc-[a-z0-9-]+)/g)) {
      expect(defined.has(name), `${file} uses ${name}`).toBe(true)
    }
  }
})

test('stylesheets have balanced braces', () => {
  for (const file of ['base.css', 'prose.css', 'fonts.css']) {
    const css = read(file)
    expect(css.split('{').length).toBe(css.split('}').length)
  }
})
