import { LitElement, css, html, nothing, svg } from 'lit'
import { define } from '../internal/define'
import { base } from '../internal/styles'

/**
 * Centers content at the site's max width with responsive side gutters.
 *
 * @slot - Content
 */
export class HcContainer extends LitElement {
  static properties = {
    size: { reflect: true }
  }

  /** `default` (1200px), `prose` (800px) or `full` */
  declare size: 'default' | 'prose' | 'full'

  constructor() {
    super()
    this.size = 'default'
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
        width: min(var(--hc-max-width), 100% - 2 * var(--hc-gutter));
        margin-inline: auto;
      }
      :host([size='prose']) {
        width: min(var(--hc-prose-width), 100% - 2 * var(--hc-gutter));
      }
      :host([size='full']) {
        width: auto;
        padding-inline: var(--hc-gutter);
      }
    `
  ]

  render() {
    return html`<slot></slot>`
  }
}

export type SectionTone = 'default' | 'surface' | 'ink' | 'wash' | 'grid'

/**
 * A full-width page section with generous vertical rhythm. Content is
 * centered in a container unless `bleed` is set.
 *
 * @slot - Content
 * @csspart inner - The centered container
 */
export class HcSection extends LitElement {
  static properties = {
    tone: { reflect: true },
    bleed: { type: Boolean, reflect: true },
    compact: { type: Boolean, reflect: true }
  }

  declare tone: SectionTone
  /** Let content span the full width */
  declare bleed: boolean
  /** Halve the vertical padding */
  declare compact: boolean

  constructor() {
    super()
    this.tone = 'default'
    this.bleed = false
    this.compact = false
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
        position: relative;
        padding-block: var(--hc-section-y);
        background: var(--hc-background);
        color: var(--hc-foreground);
      }
      :host([compact]) {
        padding-block: calc(var(--hc-section-y) / 2);
      }
      :host([tone='surface']) {
        background: var(--hc-surface);
      }
      :host([tone='ink']) {
        --hc-background: var(--hc-ink);
        --hc-foreground: var(--hc-cream);
        --hc-surface: #1f1f27;
        --hc-surface-hover: #2a2a33;
        --hc-border: rgba(255, 255, 255, 0.08);
        --hc-muted: rgba(255, 246, 235, 0.7);
        --hc-red-text: var(--hc-red-light);
        background: var(--hc-ink);
        color: var(--hc-cream);
      }
      :host([tone='wash']) {
        background: var(--hc-gradient-red-wash), var(--hc-background);
      }
      :host([tone='grid']) {
        background:
          linear-gradient(90deg, var(--hc-border) 1px, transparent 1px),
          linear-gradient(var(--hc-border) 1px, transparent 1px),
          var(--hc-background);
        background-size: 50px 50px;
      }
      .inner {
        width: min(var(--hc-max-width), 100% - 2 * var(--hc-gutter));
        margin-inline: auto;
      }
      :host([bleed]) .inner {
        width: auto;
      }
    `
  ]

  render() {
    return html`<div class="inner" part="inner"><slot></slot></div>`
  }
}

/**
 * A grid-paper background, like the hackclub.com footer.
 *
 * @slot - Content
 * @cssprop --hc-grid-size - Cell size (default 50px)
 * @cssprop --hc-grid-color - Line color
 */
export class HcGridPaper extends LitElement {
  static properties = {
    size: { type: Number }
  }

  /** Cell size in px */
  declare size?: number

  static styles = [
    base,
    css`
      :host {
        display: block;
        --hc-grid-size: 50px;
        --hc-grid-color: var(--hc-border);
        background-image:
          linear-gradient(90deg, var(--hc-grid-color) 1px, transparent 1px),
          linear-gradient(var(--hc-grid-color) 1px, transparent 1px);
        background-size: var(--hc-grid-size) var(--hc-grid-size);
      }
    `
  ]

  updated() {
    if (this.size) this.style.setProperty('--hc-grid-size', `${this.size}px`)
    else this.style.removeProperty('--hc-grid-size')
  }

  render() {
    return html`<slot></slot>`
  }
}

/**
 * A wavy section divider. Place it at the top or bottom edge of a section
 * and set `fill` to the color of the neighboring section.
 *
 * @csspart svg
 */
export class HcWave extends LitElement {
  static properties = {
    fill: {},
    flip: { type: Boolean, reflect: true },
    line: { type: Boolean, reflect: true }
  }

  /** Fill color (default: page background) */
  declare fill?: string
  /** Point the wave downward, for the top edge of a section */
  declare flip: boolean
  /** Draw a stroke along the crest */
  declare line: boolean

  constructor() {
    super()
    this.flip = false
    this.line = false
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
        line-height: 0;
        color: var(--hc-background);
        pointer-events: none;
      }
      :host([flip]) svg {
        transform: scaleY(-1);
      }
      svg {
        display: block;
        width: 100%;
        height: clamp(32px, 6vw, 80px);
      }
      .line {
        stroke: var(--hc-foreground);
        stroke-width: 2;
        vector-effect: non-scaling-stroke;
        fill: none;
      }
    `
  ]

  render() {
    const crest = 'M0 56C180 56 260 12 440 12S700 60 920 60S1240 24 1440 36'
    return html`<svg
      part="svg"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      style=${this.fill ? `color: ${this.fill}` : ''}
    >
      <path d="${crest}V80H0Z" fill="currentColor" />
      ${this.line ? svg`<path class="line" d=${crest} />` : nothing}
    </svg>`
  }
}

define('hc-container', HcContainer)
define('hc-section', HcSection)
define('hc-grid-paper', HcGridPaper)
define('hc-wave', HcWave)

declare global {
  interface HTMLElementTagNameMap {
    'hc-container': HcContainer
    'hc-section': HcSection
    'hc-grid-paper': HcGridPaper
    'hc-wave': HcWave
  }
}
