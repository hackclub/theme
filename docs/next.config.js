const path = require('path')
const isProd = process.env.VERCEL_ENV === 'production'
const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })
const monorepoRoot = path.resolve(__dirname, '..')
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
  assetPrefix: isProd ? 'https://theme.hackclub.com' : '',
  outputFileTracingRoot: monorepoRoot,
  turbopack: {
    root: monorepoRoot
  },
  transpilePackages: ['@hackclub/theme', '@hackclub/meta']
})
