import { rmSync, writeFileSync, mkdirSync } from 'fs'
import { tokens, toCSS, toTailwindCSS } from './src'

rmSync('./dist', { recursive: true, force: true })

const shared = {
  entrypoints: ['./src/index.ts'],
  minify: true,
  sourcemap: 'linked' as const
}

await Bun.build({
  ...shared,
  outdir: './dist',
  naming: 'index.cjs',
  format: 'cjs'
})
await Bun.build({
  ...shared,
  outdir: './dist',
  naming: 'index.js',
  format: 'esm'
})

mkdirSync('./dist', { recursive: true })
writeFileSync('./dist/tokens.css', toCSS())
writeFileSync('./dist/tailwind.css', toTailwindCSS())
writeFileSync('./dist/tokens.json', JSON.stringify(tokens, null, 2) + '\n')

const tsc = Bun.spawnSync(['bunx', 'tsc', '--emitDeclarationOnly'], {
  cwd: import.meta.dir
})
if (tsc.exitCode !== 0) {
  console.error(tsc.stdout.toString(), tsc.stderr.toString())
  process.exit(1)
}
