import { rmSync, readFileSync, writeFileSync } from 'fs'

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
  naming: 'index.esm.mjs',
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

const dtsPath = './dist/index.d.ts'
const dts = readFileSync(dtsPath, 'utf-8')
writeFileSync('./dist/index.d.mts', dts)

writeFileSync(dtsPath, dts.replace(/export default (\w+)/g, 'export = $1'))
