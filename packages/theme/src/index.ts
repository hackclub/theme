import prism from './prism'

const colors = {
  darker: '#121217',
  dark: '#17171d',
  darkless: '#252429',

  black: '#1f2d3d',
  steel: '#273444',
  slate: '#3c4858',
  muted: '#8492a6',
  smoke: '#e0e6ed',
  snow: '#f9fafc',
  white: '#ffffff',

  red: '#ec3750',
  orange: '#ff8c37',
  yellow: '#f1c40f',
  green: '#33d6a6',
  cyan: '#5bc0de',
  blue: '#338eda',

  twitter: '#1da1f2',
  facebook: '#3b5998',
  instagram: '#e1306c'
}

const theme = {
  breakpoints: [32, 48, 64, 96, 128].map((w) => `${w}em`),
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 16, 20, 24, 32, 48, 64, 96, 128, 160, 192],
  initialColorModeName: 'light',
  useColorSchemeMediaQuery: true,
  colors: {
    ...colors,
    text: colors.black,
    background: colors.white,
    elevated: colors.white,
    sheet: colors.snow,
    sunken: colors.smoke,
    border: colors.smoke,
    placeholder: colors.muted,
    secondary: colors.slate,
    primary: colors.red,
    muted: colors.muted,
    accent: colors.blue,
    modes: {
      dark: {
        text: colors.white,
        background: colors.dark,
        elevated: colors.darkless,
        sheet: colors.darkless,
        sunken: colors.darker,
        border: colors.darkless,
        placeholder: colors.slate,
        secondary: colors.muted,
        muted: colors.muted,
        accent: colors.cyan
      }
    }
  },
  fonts: {
    heading:
      '"Phantom Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    body:
      '"Phantom Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    monospace: '"SF Mono", "Roboto Mono", Menlo, Consolas, monospace'
  },
  lineHeights: {
    title: 1,
    heading: 1.125,
    subheading: 1.25,
    caption: 1.375,
    body: 1.5
  },
  fontWeights: {
    body: 400,
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
  radii: {
    small: 4,
    default: 8,
    extra: 12,
    ultra: 16,
    circle: 99999
  },
  shadows: {
    text: '0 1px 2px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.125)',
    small: '0 1px 2px rgba(0, 0, 0, 0.0625), 0 2px 4px rgba(0, 0, 0, 0.0625)',
    card: '0 4px 8px rgba(0, 0, 0, 0.125)',
    elevated: '0 1px 2px rgba(0, 0, 0, 0.0625), 0 8px 12px rgba(0, 0, 0, 0.125)'
  },
  text: {
    heading: {
      fontWeight: 'bold',
      lineHeight: 'heading'
    },
    title: {
      fontSize: [4, 5, 6],
      fontWeight: 'bold',
      letterSpacing: 'title',
      lineHeight: 'title'
    },
    subtitle: {
      fontSize: [2, 3, null, null, 4],
      fontWeight: 'body',
      letterSpacing: 'headline',
      lineHeight: 'subheading'
    },
    headline: {
      variant: 'text.heading',
      letterSpacing: 'headline',
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
      bg: 'orange',
      color: 'background',
      fontWeight: 'body'
    }
  },
  badges: {
    pill: {
      borderRadius: 'circle'
    }
  },
  buttons: {
    primary: {
      bg: 'primary',
      color: 'background',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontWeight: 'bold',
      borderRadius: 'default',
      display: 'inline-flex',
      alignItems: 'center',
      svg: { ml: -1, mr: 2 }
    },
    outline: {
      variant: 'buttons.primary',
      bg: 'transparent',
      color: 'primary',
      border: '2px solid currentColor'
    }
  },
  forms: {
    input: {
      bg: 'elevated',
      color: 'text',
      fontFamily: 'inherit',
      borderRadius: 'base',
      boxShadow: 'small',
      transition: 'box-shadow .125s ease-in-out',
      border: 0,
      ':hover,:focus': { boxShadow: 'card' },
      '::-webkit-input-placeholder': { color: 'placeholder' },
      '::-moz-placeholder': { color: 'placeholder' },
      ':-ms-input-placeholder': { color: 'placeholder' },
      '&[type="search"]::-webkit-search-decoration': { display: 'none' }
    },
    label: {
      color: 'text',
      fontWeight: 'medium'
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
  cards: {
    primary: {
      bg: 'elevated',
      color: 'text',
      p: [3, 4],
      borderRadius: 'extra',
      boxShadow: 'card',
      overflow: 'hidden',
      input: { boxShadow: 'none !important' }
    },
    sunken: {
      bg: 'sunken',
      p: [3, 4],
      borderRadius: 'extra',
      'input, a': { bg: 'header', boxShadow: 'none !important' }
    },
    interactive: {
      variant: 'cards.primary',
      WebkitTapHighlightColor: 'transparent',
      transition: 'transform .125s ease-in-out, box-shadow .125s ease-in-out',
      ':hover,:focus': {
        transform: 'scale(1.0625)',
        boxShadow: 'elevated'
      }
    }
  },
  layout: {
    container: {
      maxWidth: ['layout', null, 'layoutPlus', null, 'wide'],
      width: '100%',
      mx: 'auto',
      px: 3
    },
    wide: {
      variant: 'layout.container',
      maxWidth: ['wide', null, null, null, 'widePlus']
    },
    copy: {
      variant: 'layout.container',
      maxWidth: ['copy', null, null, null, 'copyPlus']
    },
    narrow: {
      variant: 'layout.container',
      maxWidth: ['narrow', null, 'narrowPlus', null, 'layout']
    }
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      color: 'text',
      margin: 0,
      minHeight: '100vh'
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
      borderBottom: '1px solid',
      borderColor: 'border'
    },
    a: {
      color: 'primary',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
      ':focus,:hover': {
        textDecorationStyle: 'wavy'
      }
    },
    pre: {
      fontFamily: 'monospace',
      fontSize: 1,
      p: 3,
      color: 'text',
      bg: 'sunken',
      overflow: 'auto',
      borderRadius: 'default',
      code: {
        color: 'inherit',
        mx: 0,
        ...prism
      }
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
      color: 'accent',
      bg: 'sunken',
      borderRadius: 'small',
      mx: 1,
      px: 1
    },
    'p > code, li > code': {
      color: 'accent',
      fontSize: 1
    },
    li: {
      my: 2
    },
    table: {
      width: '100%',
      my: 4,
      borderCollapse: 'separate',
      borderSpacing: 0,
      th: {
        textAlign: 'left',
        py: '4px',
        pr: '4px',
        pl: 0,
        borderColor: 'border',
        borderBottomStyle: 'solid'
      },
      td: {
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
  }
}

export default theme
