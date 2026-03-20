import { rmSync } from 'fs'

rmSync('./dist', { recursive: true, force: true })

const shared = {
  entrypoints: ['./src/index.js'],
  external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
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
  naming: 'index.esm.js',
  format: 'esm'
})
