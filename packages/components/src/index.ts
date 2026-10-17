/**
 * @hackclub/components — framework-agnostic web components for the
 * hackclub.com design system. Importing this module registers every element.
 */
export { HcButton } from './components/button'
export type { ButtonVariant, ButtonSize } from './components/button'
export { HcCard } from './components/card'
export type { CardVariant } from './components/card'
export { HcBadge } from './components/badge'
export type { BadgeColor, BadgeVariant } from './components/badge'
export { HcInput } from './components/input'
export { HcEmailSignup } from './components/email-signup'
export type {
  EmailSignupDetail,
  EmailSignupStatus
} from './components/email-signup'
export { HcHeading, HcKicker, HcGradientText } from './components/typography'
export type { HeadingSize, GradientTextVariant } from './components/typography'
export {
  HcContainer,
  HcSection,
  HcGridPaper,
  HcWave
} from './components/layout'
export type { SectionTone } from './components/layout'
export { HcIcon, registerGlyphs } from './components/icon'
export { HcThemeToggle } from './components/theme-toggle'
export { HcPolaroid, HcSticker } from './components/photo'
export { HcNav, HcNavMenu } from './components/nav'
export { HcFooter, HcFooterColumn } from './components/footer'
export { HcProse, HcCallout, HcCode } from './components/content'
export type { CalloutTone } from './components/content'
export { glyphNames } from './glyph-names'
export type { GlyphName } from './glyph-names'
export * from './theme'
