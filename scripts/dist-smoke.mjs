// Checks the built packages load the way consumers will load them.
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const require = createRequire(import.meta.url)
const root = fileURLToPath(new URL('..', import.meta.url))
const file = path => `${root}/${path}`

// @hackclub/meta (CJS + ESM)
const getDefault = mod => mod.default || mod
const metaCjs = getDefault(require('@hackclub/meta'))
const metaEsm = getDefault(await import('@hackclub/meta'))
for (const Meta of [metaCjs, metaEsm]) {
  const html = renderToStaticMarkup(
    React.createElement(Meta, {
      title: 'Theme Docs',
      description: 'Smoke test'
    })
  )
  assert.match(html, /<title>Theme Docs – Hack Club<\/title>/)
}

// @hackclub/tokens (CJS + ESM)
const tokensCjs = require('@hackclub/tokens')
const tokensEsm = await import('@hackclub/tokens')
for (const mod of [tokensCjs, tokensEsm]) {
  assert.equal(mod.palette.red, '#ec3750')
  assert.match(mod.toCSS(), /--hc-red: #ec3750/)
}
assert.equal(require('@hackclub/tokens/tokens.json').palette.red, '#ec3750')

// @hackclub/css-base
const css = readFileSync(require.resolve('@hackclub/css-base'), 'utf8')
assert.match(css, /--hc-red/)
assert.match(css, /@font-face/)

// @hackclub/theme: JS entry (imports cleanly outside a browser) + assets
const theme = await import('@hackclub/theme')
assert.equal(theme.palette.red, '#ec3750')
assert.equal(typeof theme.HcButton, 'function')
assert.equal(typeof theme.setTheme, 'function')
for (const asset of [
  'hackclub.js',
  'hackclub.css',
  'tokens.css',
  'tailwind.css',
  'fonts/phantom-sans-400.woff2',
  'fonts/zarathustra-400.woff2',
  'components/button.js'
]) {
  assert.ok(existsSync(file(`packages/theme/dist/${asset}`)), asset)
}

console.log('Distribution smoke checks passed')
