import { LitElement, css, html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'
import { define } from '../internal/define'
import { coreGlyphs } from '../glyphs-core'
import type { GlyphName } from '../glyph-names'

const registry = new Map<string, string>(Object.entries(coreGlyphs))
const instances = new Set<HcIcon>()

/**
 * Embed glyphs so `<hc-icon>` renders them inline instead of loading them
 * from icons.hackclub.com. `import '@hackclub/components/icons'` registers
 * the whole set.
 */
export const registerGlyphs = (glyphs: Record<string, string>) => {
  for (const [name, markup] of Object.entries(glyphs))
    registry.set(name, markup)
  for (const icon of instances) icon.requestUpdate()
}

/**
 * An icon from the Hack Club icon set (icons.hackclub.com).
 * Decorative by default; set `label` to expose it to assistive technology.
 *
 * Registered glyphs render as inline SVG; any other glyph is loaded from
 * icons.hackclub.com as a mask, so it still takes the current text color.
 *
 * @csspart svg
 */
export class HcIcon extends LitElement {
  /** Base URL for glyphs that haven't been registered */
  static cdn = 'https://icons.hackclub.com/api/icons/black/'

  static properties = {
    glyph: { reflect: true },
    size: { type: Number },
    label: {}
  }

  declare glyph: GlyphName
  /** Size in px (default 32) */
  declare size: number
  /** Accessible name; omit for decorative icons */
  declare label?: string

  constructor() {
    super()
    this.glyph = 'like'
    this.size = 32
  }

  static styles = css`
    :host {
      display: inline-flex;
      flex-shrink: 0;
      line-height: 0;
      vertical-align: middle;
    }
    svg {
      display: block;
      fill: currentColor;
    }
    .mask {
      display: block;
      background-color: currentColor;
      -webkit-mask: var(--src) center / contain no-repeat;
      mask: var(--src) center / contain no-repeat;
    }
  `

  connectedCallback() {
    super.connectedCallback()
    instances.add(this)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    instances.delete(this)
  }

  render() {
    const size = this.size || 32
    const a11y = {
      role: this.label ? 'img' : undefined,
      hidden: this.label ? undefined : 'true',
      label: this.label || undefined
    }
    const markup = registry.get(this.glyph)

    if (markup === undefined) {
      const src = `${HcIcon.cdn}${encodeURIComponent(this.glyph)}.svg`
      return html`<span
        class="mask"
        part="svg"
        style="width:${size}px;height:${size}px;--src:url(${JSON.stringify(
          src
        )})"
        role=${ifDefined(a11y.role)}
        aria-hidden=${ifDefined(a11y.hidden)}
        aria-label=${ifDefined(a11y.label)}
      ></span>`
    }

    return html`<svg
      part="svg"
      viewBox="0 0 32 32"
      width=${size}
      height=${size}
      role=${ifDefined(a11y.role)}
      aria-hidden=${ifDefined(a11y.hidden)}
      aria-label=${ifDefined(a11y.label)}
      fill-rule="evenodd"
      clip-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="1.414"
    >
      ${unsafeSVG(markup)}
    </svg>`
  }
}

define('hc-icon', HcIcon)

declare global {
  interface HTMLElementTagNameMap {
    'hc-icon': HcIcon
  }
}
