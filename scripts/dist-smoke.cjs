const assert = require('node:assert/strict')
const path = require('node:path')
const { pathToFileURL } = require('node:url')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')

const projectRoot = path.resolve(__dirname, '..')

const getDefault = mod => mod.default || mod

const importModule = relativePath =>
  import(pathToFileURL(path.join(projectRoot, relativePath)).href)

const assertMetaRender = Meta => {
  const html = renderToStaticMarkup(
    React.createElement(Meta, {
      title: 'Theme Docs',
      description: 'Smoke test description',
      image: 'https://example.com/card.png'
    })
  )

  assert.match(html, /<title>Theme Docs \u2013 Hack Club<\/title>/)
  assert.match(
    html,
    /property="og:title" content="Theme Docs \u2013 Hack Club"/
  )
  assert.match(html, /name="twitter:card" content="summary_large_image"/)
}

const assertThemeShape = theme => {
  assert.equal(theme.colors.primary, '#ec3750')
  assert.equal(theme.fonts.heading.includes('Phantom Sans'), true)
}

const main = async () => {
  const metaCjs = require('../packages/meta/dist/index.js')
  const metaEsm = await importModule('packages/meta/dist/index.esm.js')
  const themeCjs = require('../packages/theme/dist/index.js')
  const themeEsm = await importModule('packages/theme/dist/index.esm.js')

  assert.equal(typeof getDefault(metaCjs), 'function')
  assert.equal(typeof getDefault(metaEsm), 'function')

  assertMetaRender(getDefault(metaCjs))
  assertMetaRender(getDefault(metaEsm))

  assertThemeShape(getDefault(themeCjs))
  assertThemeShape(getDefault(themeEsm))

  console.log(
    'Distribution smoke checks passed for @hackclub/meta and @hackclub/theme'
  )
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
