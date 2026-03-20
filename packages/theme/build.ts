import { rmSync } from 'fs'

rmSync('./dist', { recursive: true, force: true })

const shared = {
  entrypoints: ['./src/index.ts'],
  external: ['react', 'react-dom', 'theme-ui', '@emotion/react'],
  minify: true,
  sourcemap: 'linked' as const
}

await Bun.build({
  ...shared,
  outdir: './dist',
  naming: 'index.js',
  format: 'cjs'
})
await Bun.build({
  ...shared,
  outdir: './dist',
  naming: 'index.esm.js',
  format: 'esm'
})

// Generate type declarations
const tsc = Bun.spawnSync(['bunx', 'tsc', '--emitDeclarationOnly'], {
  cwd: import.meta.dir
})
if (tsc.exitCode !== 0) {
  console.error(tsc.stderr.toString())
  process.exit(1)
}
