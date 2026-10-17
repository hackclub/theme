import { cpSync, readdirSync, rmSync } from 'fs'

rmSync('./dist', { recursive: true, force: true })

// 1. Pre-render the icon set
const icons = Bun.spawnSync(['bun', 'run', './scripts/gen-icons.tsx'], {
  cwd: import.meta.dir,
  stdout: 'inherit',
  stderr: 'inherit'
})
if (icons.exitCode !== 0) process.exit(1)

const components = readdirSync('./src/components')
  .filter(file => file.endsWith('.ts'))
  .map(file => `./src/components/${file}`)

// 2. npm build: one module per component, lit kept external for deduping
const result = await Bun.build({
  entrypoints: [
    './src/index.ts',
    './src/theme.ts',
    './src/icons.ts',
    ...components
  ],
  outdir: './dist',
  root: './src',
  format: 'esm',
  splitting: true,
  minify: true,
  sourcemap: 'linked',
  external: ['lit', 'lit/*', '@lit/*', '@hackclub/tokens']
})
if (!result.success) {
  console.error(result.logs)
  process.exit(1)
}

// 3. Type declarations
const tsc = Bun.spawnSync(['bunx', 'tsc', '-p', 'tsconfig.json'], {
  cwd: import.meta.dir
})
if (tsc.exitCode !== 0) {
  console.error(tsc.stdout.toString(), tsc.stderr.toString())
  process.exit(1)
}
cpSync('./src/text.d.ts', './dist/text.d.ts')
