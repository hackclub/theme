import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://theme.hackclub.com',
  devToolbar: { enabled: false },
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' }
    }
  },
  vite: {
    // Vite's dependency optimizer would duplicate Lit across workspace packages
    optimizeDeps: { exclude: ['@hackclub/theme', '@hackclub/components'] }
  }
})
