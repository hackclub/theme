import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'

rmSync('./dist', { recursive: true, force: true })
mkdirSync('./dist', { recursive: true })

const pkgDir = (name: string) =>
  dirname(Bun.resolveSync(`${name}/package.json`, import.meta.dir))

// npm entry: re-exports, dependencies stay external
const npm = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  naming: 'index.js',
  format: 'esm',
  minify: true,
  external: ['@hackclub/tokens', '@hackclub/components', 'lit', 'lit/*']
})

// CDN entry: a single self-contained module, including Lit
const cdn = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  naming: 'hackclub.js',
  format: 'esm',
  minify: true,
  sourcemap: 'linked'
})

for (const result of [npm, cdn]) {
  if (!result.success) {
    console.error(result.logs)
    process.exit(1)
  }
}

writeFileSync(
  './dist/index.d.ts',
  "export * from '@hackclub/tokens'\nexport * from '@hackclub/components'\n"
)

// Stylesheets and fonts
const cssBase = join(pkgDir('@hackclub/css-base'), 'dist')
const tokens = join(pkgDir('@hackclub/tokens'), 'dist')
cpSync(join(cssBase, 'index.css'), './dist/hackclub.css')
cpSync(join(cssBase, 'base.css'), './dist/base.css')
cpSync(join(cssBase, 'fonts.css'), './dist/fonts.css')
cpSync(join(cssBase, 'prose.css'), './dist/prose.css')
cpSync(join(cssBase, 'fonts'), './dist/fonts', { recursive: true })
cpSync(join(tokens, 'tokens.css'), './dist/tokens.css')
cpSync(join(tokens, 'tailwind.css'), './dist/tailwind.css')
cpSync(join(tokens, 'tokens.json'), './dist/tokens.json')

// Per-component entry points, e.g. `@hackclub/theme/components/button`
const componentsSrc = join(pkgDir('@hackclub/components'), 'dist/components')
mkdirSync('./dist/components', { recursive: true })
for (const file of readdirSync(componentsSrc)) {
  if (!file.endsWith('.js')) continue
  const name = file.replace(/\.js$/, '')
  const line = `export * from '@hackclub/components/${name}'\n`
  writeFileSync(`./dist/components/${name}.js`, line)
  writeFileSync(`./dist/components/${name}.d.ts`, line)
}
