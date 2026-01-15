import type { Theme } from 'theme-ui'
import prism from './prism'

// Base brand colors (shared with main theme)
const brandColors = {
  red: '#EC3750',
  redDark: '#D42E44',
  redLight: '#FF5A6E',
  orange: '#FF8C37',
  yellow: '#F1C40F',
  green: '#33D6A6',
  cyan: '#5BC0DE',
  blue: '#338EDA',
  blueDark: '#2B7BC0',
  purple: '#A633D6'
}

// OS9 Background Scale - Light Mode (Classic Mac Platinum)
const os9Light = {
  bgDeep: '#C0C0C0',
  bgMain: '#D4D4D4',
  bgSurface: '#E8E8E8',
  bgElevated: '#F0F0F0',
  bevelLight: '#FFFFFF',
  bevelDark: '#808080',
  bevelHighlight: '#FFFFFF',
  bevelShadow: '#404040',
  textPrimary: '#1F2937',
  textSecondary: '#4B5563',
  textMuted: '#6B7280',
  border: '#999999'
}

// OS9 Background Scale - Dark Mode (Dark Navy)
const os9Dark = {
  bgDeep: '#17212B',
  bgMain: '#1F2D3D',
  bgSurface: '#252F3F',
  bgElevated: '#2C3A4D',
  bevelLight: '#4A5568',
  bevelDark: '#0D1117',
  bevelHighlight: '#5A6A7A',
  bevelShadow: '#000000',
  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  border: '#374151'
}

// Semantic colors for light mode
const semanticLight = {
  errorBg: '#FEE2E2',
  errorBorder: '#F87171',
  errorFg: '#DC2626',
  warningBg: '#FEF3C7',
  warningBorder: '#FBBF24',
  warningFg: '#D97706',
  successBg: '#D1FAE5',
  successBorder: '#34D399',
  successFg: '#059669',
  infoBg: '#DBEAFE',
  infoBorder: '#60A5FA',
  infoFg: '#2563EB'
}

// Semantic colors for dark mode
const semanticDark = {
  errorBg: '#3B1017',
  errorBorder: '#8B2535',
  errorFg: '#F87171',
  warningBg: '#33290B',
  warningBorder: '#7F661C',
  warningFg: '#FBBF24',
  successBg: '#142C1B',
  successBorder: '#285A37',
  successFg: '#4ADE80',
  infoBg: '#0F273B',
  infoBorder: '#436075',
  infoFg: '#60A5FA'
}

const cssQueries = {
  motion: '@media (prefers-reduced-motion: no-preference)',
  reduceMotion: '@media (prefers-reduced-motion: reduce)',
  reduceTransparency: '@media (prefers-reduced-transparency: reduce)'
}

const retroTheme = {
  breakpoints: [32, 48, 64, 96, 128].map(w => `${w}em`),
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 16, 20, 24, 32, 48, 64, 96, 128, 160, 192],
  config: {
    initialColorModeName: 'retro',
    useColorSchemeMediaQuery: true
  },
  colors: {
    ...brandColors,
    text: os9Light.textPrimary,
    background: os9Light.bgMain,
    elevated: os9Light.bgElevated,
    surface: os9Light.bgSurface,
    sheet: os9Light.bgSurface,
    sunken: os9Light.bgDeep,
    border: os9Light.border,
    placeholder: os9Light.textMuted,
    secondary: os9Light.textSecondary,
    primary: brandColors.red,
    muted: os9Light.textMuted,
    accent: brandColors.blue,
    bevelLight: os9Light.bevelLight,
    bevelDark: os9Light.bevelDark,
    bevelHighlight: os9Light.bevelHighlight,
    bevelShadow: os9Light.bevelShadow,
    ...semanticLight,
    modes: {
      retro: {
        text: os9Light.textPrimary,
        background: os9Light.bgMain,
        elevated: os9Light.bgElevated,
        surface: os9Light.bgSurface,
        sheet: os9Light.bgSurface,
        sunken: os9Light.bgDeep,
        border: os9Light.border,
        placeholder: os9Light.textMuted,
        secondary: os9Light.textSecondary,
        muted: os9Light.textMuted,
        accent: brandColors.blue,
        bevelLight: os9Light.bevelLight,
        bevelDark: os9Light.bevelDark,
        bevelHighlight: os9Light.bevelHighlight,
        bevelShadow: os9Light.bevelShadow,
        ...semanticLight
      },
      retroDark: {
        text: os9Dark.textPrimary,
        background: os9Dark.bgMain,
        elevated: os9Dark.bgElevated,
        surface: os9Dark.bgSurface,
        sheet: os9Dark.bgSurface,
        sunken: os9Dark.bgDeep,
        border: os9Dark.border,
        placeholder: os9Dark.textMuted,
        secondary: os9Dark.textSecondary,
        muted: os9Dark.textMuted,
        accent: brandColors.cyan,
        bevelLight: os9Dark.bevelLight,
        bevelDark: os9Dark.bevelDark,
        bevelHighlight: os9Dark.bevelHighlight,
        bevelShadow: os9Dark.bevelShadow,
        ...semanticDark
      }
    }
  },
  fonts: {
    heading:
      '"Phantom Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    body: '"Phantom Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    monospace: '"SF Mono", "Roboto Mono", Menlo, Monaco, Consolas, monospace'
  },
  lineHeights: {
    limit: 0.875,
    title: 1,
    heading: 1.125,
    subheading: 1.25,
    caption: 1.375,
    body: 1.5
  },
  fontWeights: {
    body: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    heading: 700
  },
  letterSpacings: {
    title: '-0.009em',
    headline: '0.009em'
  },
  sizes: {
    widePlus: 2048,
    wide: 1536,
    layoutPlus: 1200,
    layout: 1024,
    copyUltra: 980,
    copyPlus: 768,
    copy: 680,
    narrowPlus: 600,
    narrow: 512
  },
  // Sharp border radii for OS9 look
  radii: {
    small: 2,
    default: 4,
    lg: 6,
    extra: 6,
    ultra: 8,
    circle: 99999
  },
  // Hard pixel shadows (no blur)
  shadows: {
    text: '1px 1px 0 rgba(0, 0, 0, 0.25)',
    small: '1px 1px 0 rgba(0, 0, 0, 0.15)',
    card: '2px 2px 0 rgba(0, 0, 0, 0.2)',
    elevated: '4px 4px 0 rgba(0, 0, 0, 0.25)',
    xl: '6px 6px 0 rgba(0, 0, 0, 0.3)'
  },
  text: {
    heading: {
      fontWeight: 'bold',
      lineHeight: 'heading',
      mt: 0,
      mb: 0
    },
    ultratitle: {
      fontSize: [5, 6, 7],
      lineHeight: 'limit',
      fontWeight: 'bold',
      letterSpacing: 'title'
    },
    title: {
      fontSize: [4, 5, 6],
      fontWeight: 'bold',
      letterSpacing: 'title',
      lineHeight: 'title'
    },
    subtitle: {
      mt: 3,
      fontSize: [2, 3],
      fontWeight: 'medium',
      letterSpacing: 'headline',
      lineHeight: 'subheading'
    },
    headline: {
      variant: 'text.heading',
      letterSpacing: 'headline',
      lineHeight: 'heading',
      fontSize: 4,
      mt: 3,
      mb: 3
    },
    subheadline: {
      variant: 'text.heading',
      letterSpacing: 'headline',
      fontSize: 2,
      mt: 0,
      mb: 3
    },
    eyebrow: {
      color: 'muted',
      fontSize: [3, 4],
      fontWeight: 'semibold',
      letterSpacing: 'headline',
      lineHeight: 'subheading',
      textTransform: 'uppercase',
      mt: 0,
      mb: 2
    },
    lead: {
      fontSize: [2, 3],
      my: [2, 3]
    },
    caption: {
      color: 'muted',
      fontWeight: 'medium',
      letterSpacing: 'headline',
      lineHeight: 'caption'
    }
  },
  alerts: {
    primary: {
      borderRadius: 'default',
      bg: 'errorBg',
      color: 'errorFg',
      border: '2px solid',
      borderColor: 'errorBorder',
      borderTopColor: 'bevelLight',
      borderLeftColor: 'bevelLight',
      p: 3,
      fontWeight: 'medium'
    },
    warning: {
      borderRadius: 'default',
      bg: 'warningBg',
      color: 'warningFg',
      border: '2px solid',
      borderColor: 'warningBorder',
      borderTopColor: 'bevelLight',
      borderLeftColor: 'bevelLight',
      p: 3,
      fontWeight: 'medium'
    },
    success: {
      borderRadius: 'default',
      bg: 'successBg',
      color: 'successFg',
      border: '2px solid',
      borderColor: 'successBorder',
      borderTopColor: 'bevelLight',
      borderLeftColor: 'bevelLight',
      p: 3,
      fontWeight: 'medium'
    },
    info: {
      borderRadius: 'default',
      bg: 'infoBg',
      color: 'infoFg',
      border: '2px solid',
      borderColor: 'infoBorder',
      borderTopColor: 'bevelLight',
      borderLeftColor: 'bevelLight',
      p: 3,
      fontWeight: 'medium'
    }
  },
  badges: {
    pill: {
      borderRadius: 'small',
      px: 3,
      py: 1,
      fontSize: 1,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      border: '2px solid',
      borderColor: 'bevelDark',
      borderTopColor: 'bevelLight',
      borderLeftColor: 'bevelLight',
      backgroundImage: 'linear-gradient(180deg, #F0F0F0, #E8E8E8)'
    },
    success: {
      variant: 'badges.pill',
      bg: 'successFg',
      color: 'white',
      borderColor: semanticLight.successFg,
      backgroundImage: 'linear-gradient(180deg, #4ADE80, #22C55E)'
    },
    danger: {
      variant: 'badges.pill',
      bg: 'errorFg',
      color: 'white',
      borderColor: semanticLight.errorFg,
      backgroundImage: 'linear-gradient(180deg, #F87171, #EF4444)'
    },
    warning: {
      variant: 'badges.pill',
      bg: 'warningFg',
      color: '#451A03',
      borderColor: semanticLight.warningFg,
      backgroundImage: 'linear-gradient(180deg, #FBBF24, #F59E0B)'
    },
    info: {
      variant: 'badges.pill',
      bg: 'infoFg',
      color: 'white',
      borderColor: semanticLight.infoFg,
      backgroundImage: 'linear-gradient(180deg, #60A5FA, #3B82F6)'
    }
  },
  buttons: {
    // Primary button with OS9 raised bevel effect
    primary: {
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontWeight: 'semibold',
      borderRadius: 'default',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: 4,
      py: 3,
      backgroundImage: t =>
        `linear-gradient(180deg, ${brandColors.redLight}, ${brandColors.red})`,
      color: 'white',
      border: '2px solid',
      borderColor: brandColors.redDark,
      borderTopColor: '#FF7A8E',
      borderLeftColor: '#FF7A8E',
      boxShadow: '1px 1px 0 rgba(0, 0, 0, 0.15), inset 1px 1px 0 rgba(255, 255, 255, 0.2)',
      letterSpacing: 'headline',
      WebkitTapHighlightColor: 'transparent',
      transition: 'transform .125s ease-in-out, box-shadow .125s ease-in-out',
      ':focus,:hover': {
        backgroundImage: `linear-gradient(180deg, ${brandColors.red}, ${brandColors.redDark})`,
        transform: 'translateY(-1px)',
        boxShadow: '2px 2px 0 rgba(0, 0, 0, 0.2), inset 1px 1px 0 rgba(255, 255, 255, 0.2)'
      },
      ':active': {
        transform: 'translateY(1px)',
        borderColor: '#FF7A8E',
        borderTopColor: brandColors.redDark,
        borderLeftColor: brandColors.redDark,
        boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.3)'
      },
      svg: { ml: -1, mr: 2 }
    },
    // Secondary button with OS9 gray bevel
    secondary: {
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontWeight: 'semibold',
      borderRadius: 'default',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: 4,
      py: 3,
      backgroundImage: 'linear-gradient(180deg, #F0F0F0, #E8E8E8)',
      color: 'text',
      border: '2px solid',
      borderColor: 'bevelDark',
      borderTopColor: 'bevelLight',
      borderLeftColor: 'bevelLight',
      boxShadow: '1px 1px 0 rgba(0, 0, 0, 0.15), inset 1px 1px 0 #FFFFFF',
      letterSpacing: 'headline',
      WebkitTapHighlightColor: 'transparent',
      transition: 'transform .125s ease-in-out, box-shadow .125s ease-in-out',
      ':focus,:hover': {
        transform: 'translateY(-1px)',
        boxShadow: '2px 2px 0 rgba(0, 0, 0, 0.2), inset 1px 1px 0 #FFFFFF'
      },
      ':active': {
        transform: 'translateY(1px)',
        borderColor: 'bevelLight',
        borderTopColor: 'bevelDark',
        borderLeftColor: 'bevelDark',
        boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.3)'
      },
      svg: { ml: -1, mr: 2 }
    },
    danger: {
      variant: 'buttons.primary',
      backgroundImage: 'linear-gradient(180deg, #F87171, #DC2626)',
      borderColor: '#991B1B',
      borderTopColor: '#FCA5A5',
      borderLeftColor: '#FCA5A5',
      ':focus,:hover': {
        backgroundImage: 'linear-gradient(180deg, #DC2626, #B91C1C)'
      },
      ':active': {
        borderColor: '#FCA5A5',
        borderTopColor: '#991B1B',
        borderLeftColor: '#991B1B'
      }
    },
    success: {
      variant: 'buttons.primary',
      backgroundImage: 'linear-gradient(180deg, #4ADE80, #16A34A)',
      borderColor: '#166534',
      borderTopColor: '#86EFAC',
      borderLeftColor: '#86EFAC',
      ':focus,:hover': {
        backgroundImage: 'linear-gradient(180deg, #16A34A, #15803D)'
      },
      ':active': {
        borderColor: '#86EFAC',
        borderTopColor: '#166534',
        borderLeftColor: '#166534'
      }
    }
  },
  cards: {
    // Raised card with OS9 bevel effect
    primary: {
      backgroundImage: 'linear-gradient(180deg, #F0F0F0, #E8E8E8)',
      color: 'text',
      p: [3, 4],
      borderRadius: 'default',
      border: '2px solid',
      borderColor: 'bevelDark',
      borderTopColor: 'bevelLight',
      borderLeftColor: 'bevelLight',
      boxShadow: '2px 2px 0 rgba(0, 0, 0, 0.2), inset 1px 1px 0 #FFFFFF',
      overflow: 'hidden'
    },
    // Inset/sunken card
    sunken: {
      bg: 'sunken',
      p: [3, 4],
      borderRadius: 'default',
      border: '2px solid',
      borderColor: 'bevelLight',
      borderTopColor: 'bevelDark',
      borderLeftColor: 'bevelDark',
      boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.2)'
    },
    // Interactive card with hover effect
    interactive: {
      variant: 'cards.primary',
      textDecoration: 'none',
      WebkitTapHighlightColor: 'transparent',
      transition: 'transform .125s ease-in-out, box-shadow .125s ease-in-out',
      ':hover,:focus': {
        transform: 'translateY(-2px)',
        boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.25), inset 1px 1px 0 #FFFFFF'
      }
    }
  },
  forms: {
    // Inset input (sunken effect)
    input: {
      bg: 'sunken',
      color: 'text',
      fontFamily: 'inherit',
      borderRadius: 'small',
      border: '2px solid',
      borderColor: 'bevelLight',
      borderTopColor: 'bevelDark',
      borderLeftColor: 'bevelDark',
      boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.2)',
      px: 3,
      py: 2,
      ':focus': {
        borderColor: 'primary',
        boxShadow:
          'inset 2px 2px 4px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(236, 55, 80, 0.2)',
        outline: 'none'
      },
      '::-webkit-input-placeholder': { color: 'placeholder' },
      '::-moz-placeholder': { color: 'placeholder' },
      ':-ms-input-placeholder': { color: 'placeholder' },
      '&[type="search"]::-webkit-search-decoration': { display: 'none' }
    },
    textarea: { variant: 'forms.input' },
    select: { variant: 'forms.input' },
    label: {
      color: 'text',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left',
      lineHeight: 'caption',
      fontSize: 2,
      fontWeight: 'medium'
    },
    labelHoriz: {
      color: 'text',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'left',
      lineHeight: 'caption',
      fontSize: 2,
      fontWeight: 'medium',
      svg: { color: 'muted' }
    },
    slider: {
      color: 'primary'
    },
    hidden: {
      position: 'absolute',
      height: '1px',
      width: '1px',
      overflow: 'hidden',
      clip: 'rect(1px, 1px, 1px, 1px)',
      whiteSpace: 'nowrap'
    }
  },
  layout: {
    container: {
      maxWidth: ['layout', null, 'layoutPlus'],
      width: '100%',
      mx: 'auto',
      px: 3
    },
    wide: {
      variant: 'layout.container',
      maxWidth: ['layout', null, 'wide']
    },
    copy: {
      variant: 'layout.container',
      maxWidth: ['copy', null, 'copyPlus']
    },
    narrow: {
      variant: 'layout.container',
      maxWidth: ['narrow', null, 'narrowPlus']
    }
  },
  nav: {
    sticky: {
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      bg: 'bgMain',
      borderBottom: '2px solid',
      borderBottomColor: 'bevelDark',
      boxShadow: '0 2px 0 rgba(255, 255, 255, 0.5)',
      py: 2
    }
  },
  hero: {
    gradient: {
      py: [5, 6],
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      bg: 'bgDeep',
      border: '2px solid',
      borderColor: 'bevelDark',
      boxShadow: 'inset 2px 2px 0 rgba(0, 0, 0, 0.2)'
    }
  },
  footer: {
    default: {
      bg: 'bgMain',
      borderTop: '2px solid',
      borderTopColor: 'bevelDark',
      boxShadow: '0 -2px 0 rgba(255, 255, 255, 0.5)',
      py: 5,
      mt: 6,
      position: 'relative'
    }
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      color: 'text',
      bg: 'background',
      margin: 0,
      minHeight: '100vh',
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    },
    h1: {
      variant: 'text.heading',
      fontSize: 5
    },
    h2: {
      variant: 'text.heading',
      fontSize: 4
    },
    h3: {
      variant: 'text.heading',
      fontSize: 3
    },
    h4: {
      variant: 'text.heading',
      fontSize: 2
    },
    h5: {
      variant: 'text.heading',
      fontSize: 1
    },
    h6: {
      variant: 'text.heading',
      fontSize: 0
    },
    p: {
      color: 'text',
      fontWeight: 'body',
      lineHeight: 'body',
      my: 3
    },
    img: {
      maxWidth: '100%'
    },
    hr: {
      border: 0,
      height: 2,
      background: 'bevelDark',
      boxShadow: '0 1px 0 #FFFFFF',
      my: 4
    },
    a: {
      color: 'primary',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
      ':focus,:hover': {
        color: 'redDark'
      }
    },
    pre: {
      fontFamily: 'monospace',
      fontSize: 1,
      p: 3,
      color: 'text',
      bg: 'sunken',
      overflow: 'auto',
      borderRadius: 'small',
      border: '2px solid',
      borderColor: 'bevelLight',
      borderTopColor: 'bevelDark',
      borderLeftColor: 'bevelDark',
      boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.2)',
      code: {
        color: 'inherit',
        mx: 0,
        px: 0,
        ...prism
      }
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
      color: 'purple',
      bg: 'sunken',
      borderRadius: 'small',
      border: '1px solid',
      borderColor: 'border',
      mx: 1,
      px: 1
    },
    'p > code, li > code': {
      color: 'purple',
      fontSize: '0.875em'
    },
    'p > a > code, li > a > code': {
      color: 'red',
      fontSize: '0.875em'
    },
    li: {
      my: 2
    },
    table: {
      width: '100%',
      my: 4,
      borderCollapse: 'separate',
      borderSpacing: 0,
      'th,td': {
        textAlign: 'left',
        py: '4px',
        pr: '4px',
        pl: 0,
        borderColor: 'border',
        borderBottomStyle: 'solid'
      }
    },
    th: {
      verticalAlign: 'bottom',
      borderBottomWidth: '2px'
    },
    td: {
      verticalAlign: 'top',
      borderBottomWidth: '1px'
    }
  },
  util: {
    cx: (c: string) => retroTheme.colors![c] || c,
    gx: (from: string, to: string): string => `radial-gradient(
      ellipse farthest-corner at top left,
      ${retroTheme.util.cx(from)},
      ${retroTheme.util.cx(to)}
    )`,
    gxText: (from: string, to: string) => ({
      color: retroTheme.util.cx(to),
      [retroTheme.util.supportsClipText]: {
        backgroundImage: retroTheme.util.gx(from, to),
        backgroundRepeat: 'no-repeat',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }
    }),
    supportsClipText: '@supports (-webkit-background-clip: text)',
    supportsBackdrop:
      '@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none)',
    ...cssQueries
  }
}

export default retroTheme as Theme
