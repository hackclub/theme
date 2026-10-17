import { LitElement, css, html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { styleMap } from 'lit/directives/style-map.js'
import { define } from '../internal/define'
import { base, focusRing } from '../internal/styles'

export type CardVariant = 'surface' | 'raised' | 'outline' | 'image' | 'ink'

/**
 * A rounded content card.
 *
 * @slot - Card body
 * @slot media - Full-bleed content above the body, e.g. an `<img>`
 * @slot footer - Content pinned to the bottom of the card
 * @csspart card - The card element
 * @csspart body - The padded body
 * @cssprop --hc-card-padding - Body padding
 */
export class HcCard extends LitElement {
  static properties = {
    variant: { reflect: true },
    href: {},
    target: {},
    image: {},
    interactive: { type: Boolean, reflect: true },
    _hasFooter: { state: true }
  }

  declare variant: CardVariant
  /** Makes the whole card a link */
  declare href?: string
  declare target?: string
  /** Background image for the `image` variant */
  declare image?: string
  /** Lift on hover (automatic when `href` is set) */
  declare interactive: boolean
  declare _hasFooter: boolean

  constructor() {
    super()
    this.variant = 'surface'
    this.interactive = false
    this._hasFooter = false
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
        --hc-card-padding: var(--hc-space-6);
      }
      :host([variant='raised']) {
        --hc-card-padding: var(--hc-space-8);
      }
      :host([variant='image']) {
        --hc-card-padding: var(--hc-space-8) var(--hc-space-10);
      }

      .card {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
        border-radius: var(--hc-radius-card);
        background: var(--hc-surface);
        color: var(--hc-foreground);
        text-decoration: none;
        transition:
          transform var(--hc-duration-medium) var(--hc-ease-playful),
          box-shadow var(--hc-duration-medium) var(--hc-ease-playful);
      }
      :host([variant='raised']) .card {
        border: 1px solid var(--hc-border);
        border-radius: var(--hc-radius-2xl);
        box-shadow: var(--hc-shadow-raised);
      }
      :host([variant='outline']) .card {
        background: transparent;
        border: 1px solid var(--hc-border);
      }
      :host([variant='ink']) .card {
        background: var(--hc-ink);
        color: var(--hc-cream);
      }
      :host([variant='image']) .card {
        background-color: var(--hc-ink);
        background-size: cover;
        background-position: center;
        color: var(--hc-paper);
        isolation: isolate;
      }
      :host([variant='image']) .card::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        background: rgba(0, 0, 0, 0.6);
      }

      a.card:hover,
      :host([interactive]) .card:hover {
        transform: translateY(-4px);
        box-shadow: var(--hc-shadow-card);
      }
      a.card:focus-visible {
        ${focusRing}
      }

      .body {
        flex: 1;
        padding: var(--hc-card-padding);
      }
      ::slotted([slot='media']) {
        display: block;
        width: 100%;
        object-fit: cover;
      }
      .footer {
        padding: 0 var(--hc-card-padding) var(--hc-card-padding);
      }
      .footer[hidden] {
        display: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .card {
          transition: none;
        }
        a.card:hover,
        :host([interactive]) .card:hover {
          transform: none;
        }
      }
    `
  ]

  #onFooterChange(event: Event) {
    const slot = event.target as HTMLSlotElement
    this._hasFooter = slot.assignedNodes({ flatten: true }).length > 0
  }

  render() {
    const style = styleMap(
      this.variant === 'image' && this.image
        ? { backgroundImage: `url(${JSON.stringify(this.image)})` }
        : {}
    )
    const content = html`<slot name="media"></slot>
      <div class="body" part="body"><slot></slot></div>
      <div class="footer" part="footer" ?hidden=${!this._hasFooter}>
        <slot name="footer" @slotchange=${this.#onFooterChange}></slot>
      </div>`

    return this.href
      ? html`<a
          class="card"
          part="card"
          href=${this.href}
          target=${ifDefined(this.target)}
          rel=${ifDefined(
            this.target === '_blank' ? 'noopener noreferrer' : undefined
          )}
          style=${style}
          >${content}</a
        >`
      : html`<div class="card" part="card" style=${style}>${content}</div>`
  }
}

define('hc-card', HcCard)

declare global {
  interface HTMLElementTagNameMap {
    'hc-card': HcCard
  }
}
