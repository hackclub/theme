import { LitElement, css, html, nothing } from 'lit'
import { define } from '../internal/define'
import { base, focusRing } from '../internal/styles'
import proseCSS from '@hackclub/css-base/src/prose.css' with { type: 'text' }
import './icon'

const adopted = new WeakSet<Document | ShadowRoot>()

/** Add the prose stylesheet to a document or shadow root, once. */
const adoptProse = (root: Document | ShadowRoot) => {
  if (adopted.has(root)) return
  adopted.add(root)
  if ('adoptedStyleSheets' in root && typeof CSSStyleSheet === 'function') {
    try {
      const sheet = new CSSStyleSheet()
      sheet.replaceSync(proseCSS)
      root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet]
      return
    } catch {}
  }
  const style = document.createElement('style')
  style.dataset.hcProse = ''
  style.textContent = proseCSS
  const target = root instanceof Document ? root.head : root
  target.prepend(style)
}

/**
 * Styles long-form HTML (e.g. rendered Markdown) like hackclub.com’s text
 * pages. Content stays in the light DOM so any nested markup is styled.
 *
 * @slot - Rendered HTML
 */
export class HcProse extends LitElement {
  createRenderRoot() {
    return this
  }

  connectedCallback() {
    super.connectedCallback()
    adoptProse(this.getRootNode() as Document | ShadowRoot)
  }

  render() {
    return nothing
  }
}

export type CalloutTone = 'note' | 'tip' | 'warning' | 'danger'

const calloutIcons: Record<CalloutTone, string> = {
  note: 'info',
  tip: 'idea',
  warning: 'important',
  danger: 'important'
}

/**
 * A highlighted aside for notes, tips and warnings.
 *
 * @slot - Body
 * @slot heading - Replaces the `heading` attribute
 * @csspart callout
 */
export class HcCallout extends LitElement {
  static properties = {
    tone: { reflect: true },
    heading: {}
  }

  declare tone: CalloutTone
  declare heading?: string

  constructor() {
    super()
    this.tone = 'note'
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
        margin: 0 0 var(--hc-space-6);
        --c: var(--hc-blue);
      }
      :host([tone='tip']) {
        --c: var(--hc-green);
      }
      :host([tone='warning']) {
        --c: var(--hc-orange);
      }
      :host([tone='danger']) {
        --c: var(--hc-red);
      }
      .callout {
        display: flex;
        gap: var(--hc-space-3);
        padding: var(--hc-space-4) var(--hc-space-5);
        border-left: 4px solid var(--c);
        border-radius: var(--hc-radius-lg);
        background: color-mix(in srgb, var(--c) 10%, var(--hc-surface));
        color: var(--hc-foreground);
        font-family: var(--hc-font-sans);
        font-size: var(--hc-text-md);
        line-height: var(--hc-leading-normal);
      }
      hc-icon {
        color: var(--c);
        margin-top: -1px;
      }
      .content {
        min-width: 0;
      }
      .heading {
        display: block;
        margin-bottom: 2px;
        font-weight: 700;
      }
      ::slotted(:first-child) {
        margin-top: 0;
      }
      ::slotted(:last-child) {
        margin-bottom: 0;
      }
    `
  ]

  render() {
    const hasHeading = this.heading || this.querySelector('[slot="heading"]')
    return html`<div class="callout" part="callout" role="note">
      <hc-icon glyph=${calloutIcons[this.tone] ?? 'info'} size="28"></hc-icon>
      <div class="content">
        ${hasHeading
          ? html`<strong class="heading"
              ><slot name="heading">${this.heading}</slot></strong
            >`
          : nothing}
        <slot></slot>
      </div>
    </div>`
  }
}

/**
 * A code block with an optional file name and a copy button.
 *
 * @slot - The code, as text
 * @csspart pre
 * @csspart copy
 */
export class HcCode extends LitElement {
  static properties = {
    filename: {},
    language: { reflect: true },
    nocopy: { type: Boolean },
    copied: { state: true }
  }

  declare filename?: string
  declare language?: string
  /** Hide the copy button */
  declare nocopy: boolean
  declare copied: boolean

  #timer?: ReturnType<typeof setTimeout>

  constructor() {
    super()
    this.nocopy = false
    this.copied = false
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
        position: relative;
        margin: 0 0 var(--hc-space-6);
        border: 1px solid var(--hc-border);
        border-radius: var(--hc-radius-lg);
        background: var(--hc-surface);
        color: var(--hc-foreground);
        overflow: hidden;
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--hc-space-2) var(--hc-space-4);
        border-bottom: 1px solid var(--hc-border);
        font-family: var(--hc-font-mono);
        font-size: 0.875rem;
        color: var(--hc-muted);
      }
      pre {
        margin: 0;
        padding: var(--hc-space-4) var(--hc-space-5);
        overflow-x: auto;
        font-family: var(--hc-font-mono);
        font-size: 0.9375rem;
        line-height: var(--hc-leading-normal);
        white-space: pre;
        tab-size: 2;
      }
      .copy {
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 4px 12px;
        border: 1px solid var(--hc-border);
        border-radius: var(--hc-radius-pill);
        background: var(--hc-background);
        color: var(--hc-foreground);
        font-family: var(--hc-font-sans);
        font-size: 0.875rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity var(--hc-duration-fast) var(--hc-ease-standard);
      }
      .header + pre .copy,
      :host([filename]) .copy {
        top: 5px;
        padding: 2px 10px;
      }
      :host(:hover) .copy,
      .copy:focus-visible,
      .copy.copied {
        opacity: 1;
      }
      .copy:focus-visible {
        ${focusRing}
      }
      @media (hover: none) {
        .copy {
          opacity: 1;
        }
      }
    `
  ]

  /** The code as plain text, with common indentation removed. */
  get code() {
    const lines = (this.textContent ?? '').replace(/^\n+|\s+$/g, '').split('\n')
    const indent = Math.min(
      ...lines.filter(l => l.trim()).map(l => l.match(/^\s*/)![0].length)
    )
    return lines
      .map(l => l.slice(Number.isFinite(indent) ? indent : 0))
      .join('\n')
  }

  async #copy() {
    try {
      await navigator.clipboard.writeText(this.code)
      this.copied = true
      clearTimeout(this.#timer)
      this.#timer = setTimeout(() => (this.copied = false), 1600)
    } catch {}
  }

  #onSlotChange() {
    this.requestUpdate()
  }

  render() {
    return html`${this.filename
        ? html`<div class="header"><span>${this.filename}</span></div>`
        : nothing}
      <pre part="pre"><code>${this.code}</code></pre>
      <slot hidden @slotchange=${this.#onSlotChange}></slot>
      ${this.nocopy
        ? nothing
        : html`<button
            class="copy ${this.copied ? 'copied' : ''}"
            part="copy"
            type="button"
            @click=${this.#copy}
          >
            ${this.copied ? 'Copied!' : 'Copy'}
          </button>`}`
  }
}

define('hc-prose', HcProse)
define('hc-callout', HcCallout)
define('hc-code', HcCode)

declare global {
  interface HTMLElementTagNameMap {
    'hc-prose': HcProse
    'hc-callout': HcCallout
    'hc-code': HcCode
  }
}
