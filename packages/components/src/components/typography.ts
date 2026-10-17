import { LitElement, css, html } from 'lit'
import { literal, html as staticHtml } from 'lit/static-html.js'
import { define } from '../internal/define'
import { base } from '../internal/styles'

export type HeadingSize = 'display' | 'title' | 'heading' | 'xl' | 'lg' | 'body'

const tags = [
  literal`h1`,
  literal`h2`,
  literal`h3`,
  literal`h4`,
  literal`h5`,
  literal`h6`
]

const defaultSizes: HeadingSize[] = [
  'title',
  'heading',
  'xl',
  'lg',
  'body',
  'body'
]

/**
 * A heading in Zarathustra, the hackclub.com display face.
 *
 * @slot - Heading text
 * @csspart heading - The `<h1>`–`<h6>` element
 */
export class HcHeading extends LitElement {
  static properties = {
    level: { type: Number, reflect: true },
    size: { reflect: true }
  }

  /** Heading level, 1–6 (default 2) */
  declare level: number
  /** Visual size, independent of level */
  declare size?: HeadingSize

  constructor() {
    super()
    this.level = 2
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
        margin: 0 0 var(--hc-space-4);
      }
      .heading {
        margin: 0;
        font-family: var(--hc-font-display);
        font-weight: 400;
        line-height: var(--hc-leading-heading);
        text-wrap: balance;
      }
      .display {
        font-size: var(--hc-text-display);
        line-height: var(--hc-leading-display);
        letter-spacing: var(--hc-tracking-display);
      }
      .title {
        font-size: var(--hc-text-title);
      }
      .heading-size {
        font-size: var(--hc-text-heading);
      }
      .xl {
        font-size: var(--hc-text-xl);
      }
      .lg {
        font-size: var(--hc-text-lg);
      }
      .body {
        font-size: var(--hc-text-body);
      }
    `
  ]

  render() {
    const level = Math.min(6, Math.max(1, Math.round(this.level || 2)))
    const size = this.size ?? defaultSizes[level - 1]
    const cls = size === 'heading' ? 'heading-size' : size
    return staticHtml`<${tags[level - 1]} class="heading ${cls}" part="heading"><slot></slot></${tags[level - 1]}>`
  }
}

/**
 * The small, tracked-out uppercase label that sits above section headings.
 *
 * @slot - Label text
 */
export class HcKicker extends LitElement {
  static properties = {
    color: { reflect: true }
  }

  /** `red` (default), `muted` or `inherit` */
  declare color: 'red' | 'muted' | 'inherit'

  constructor() {
    super()
    this.color = 'red'
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
        margin: 0 0 var(--hc-space-3);
        color: var(--hc-red-text);
        font-family: var(--hc-font-sans);
        font-size: var(--hc-text-xs);
        font-weight: 700;
        letter-spacing: var(--hc-tracking-kicker);
        line-height: var(--hc-leading-snug);
        text-transform: uppercase;
      }
      :host([color='muted']) {
        color: var(--hc-muted);
      }
      :host([color='inherit']) {
        color: inherit;
      }
    `
  ]

  render() {
    return html`<slot></slot>`
  }
}

export type GradientTextVariant = 'brand' | 'deep' | 'rainbow'

/**
 * Text filled with a brand gradient. `rainbow` animates like the "teens" on
 * the hackclub.com homepage.
 *
 * @slot - Text
 */
export class HcGradientText extends LitElement {
  static properties = {
    variant: { reflect: true },
    still: { type: Boolean, reflect: true }
  }

  declare variant: GradientTextVariant
  /** Disable the rainbow animation */
  declare still: boolean

  constructor() {
    super()
    this.variant = 'brand'
    this.still = false
  }

  static styles = css`
    :host {
      display: inline;
      background-image: var(--hc-gradient-brand);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
    }
    :host([variant='deep']) {
      background-image: var(--hc-gradient-brand-deep);
    }
    :host([variant='rainbow']) {
      background-image: var(--hc-gradient-rainbow);
      background-size: 200% 100%;
      animation: hc-rainbow 6s linear infinite;
    }
    :host([still]) {
      animation: none;
    }
    @keyframes hc-rainbow {
      from {
        background-position: 0% 50%;
      }
      to {
        background-position: -200% 50%;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host {
        animation: none !important;
      }
    }
  `

  render() {
    return html`<slot></slot>`
  }
}

define('hc-heading', HcHeading)
define('hc-kicker', HcKicker)
define('hc-gradient-text', HcGradientText)

declare global {
  interface HTMLElementTagNameMap {
    'hc-heading': HcHeading
    'hc-kicker': HcKicker
    'hc-gradient-text': HcGradientText
  }
}
