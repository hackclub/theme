import 'theme-ui'

declare module 'theme-ui' {
  interface Theme {
    util: {
      /**
       * '@media (prefers-reduced-motion: no-preference)'
       */
      motion: string
      /**
       * '@media (prefers-reduced-motion: reduce)'
       */
      reduceMotion: string
      /**
       * '@media (prefers-reduced-transparency: reduce)'
       */
      reduceTransparency: string
      /**
       * '@supports (-webkit-background-clip: text)'
       */
      supportsClipText: string
      /**
       * '@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none)'
       */
      supportsBackdrop: string
      cx: (c: string) => ColorOrNestedColorScale
      gx: (from: string, to: string) => ThemeUICSSObject
      gxText: (from: string, to: string) => ThemeUICSSObject
    }
  }
}
