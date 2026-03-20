import { rmSync, readFileSync, writeFileSync } from 'fs'

rmSync('./dist', { recursive: true, force: true })

const shared = {
  entrypoints: ['./src/index.tsx'],
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'react/jsx-dev-runtime'
  ],
  minify: true,
  sourcemap: 'linked' as const,
  define: {
    'process.env.NODE_ENV': '"production"'
  }
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

const tsc = Bun.spawnSync(['bunx', 'tsc', '--emitDeclarationOnly'], {
  cwd: import.meta.dir
})
if (tsc.exitCode !== 0) {
  console.error(tsc.stderr.toString())
  process.exit(1)
}

const dtsPath = `${import.meta.dir}/dist/index.d.ts`
const dts = readFileSync(dtsPath, 'utf8')
writeFileSync(`${import.meta.dir}/dist/index.d.mts`, dts)

writeFileSync(dtsPath, dts.replace('export default ', 'export = '))
