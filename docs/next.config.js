const path = require('path')
const isProd = process.env.VERCEL_ENV === 'production'
const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
  assetPrefix: isProd ? 'https://theme.hackclub.com' : '',
  turbopack: {
    root: path.resolve(__dirname)
  }
})
