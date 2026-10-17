import { LitElement, css, html, nothing } from 'lit'
import { define } from '../internal/define'
import { base } from '../internal/styles'

export type BadgeColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'purple'
  | 'muted'
  | 'ink'
export type BadgeVariant = 'solid' | 'soft' | 'outline'

/**
 * A small pill label.
 *
 * @slot - Label
 * @csspart badge - The pill
 */
export class HcBadge extends LitElement {
  static properties = {
    color: { reflect: true },
    variant: { reflect: true },
    pulse: { type: Boolean, reflect: true }
  }

  declare color: BadgeColor
  declare variant: BadgeVariant
  /** Show a pulsing "live" dot */
  declare pulse: boolean

  constructor() {
    super()
    this.color = 'red'
    this.variant = 'solid'
    this.pulse = false
  }

  static styles = [
    base,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
        --c: var(--hc-red);
        --on-c: var(--hc-paper);
      }
      :host([color='orange']) {
        --c: var(--hc-orange);
        --on-c: var(--hc-ink);
      }
      :host([color='yellow']) {
        --c: var(--hc-yellow);
        --on-c: var(--hc-ink);
      }
      :host([color='green']) {
        --c: var(--hc-green);
        --on-c: var(--hc-ink);
      }
      :host([color='cyan']) {
        --c: var(--hc-cyan);
        --on-c: var(--hc-ink);
      }
      :host([color='blue']) {
        --c: var(--hc-blue);
      }
      :host([color='purple']) {
        --c: var(--hc-purple);
      }
      :host([color='muted']) {
        --c: var(--hc-gray);
      }
      :host([color='ink']) {
        --c: var(--hc-foreground);
        --on-c: var(--hc-background);
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 12px;
        border: 1.5px solid var(--c);
        border-radius: var(--hc-radius-pill);
        background: var(--c);
        color: var(--on-c);
        font-family: var(--hc-font-sans);
        font-size: 0.875rem;
        font-weight: 700;
        line-height: 1.2;
        white-space: nowrap;
      }
      :host([variant='soft']) .badge {
        border-color: transparent;
        background: color-mix(in srgb, var(--c) 16%, transparent);
        color: color-mix(in srgb, var(--c) 65%, var(--hc-foreground));
      }
      :host([variant='outline']) .badge {
        background: transparent;
        color: color-mix(in srgb, var(--c) 75%, var(--hc-foreground));
      }

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: currentColor;
        animation: pulse 1.6s ease-in-out infinite;
      }
      @keyframes pulse {
        50% {
          opacity: 0.4;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .dot {
          animation: none;
        }
      }
    `
  ]

  render() {
    return html`<span class="badge" part="badge"
      >${
        this.pulse
          ? html`<span class="dot" aria-hidden="true"></span>`
          : nothing
      }<slot></slot
    ></span>`
  }
}

define('hc-badge', HcBadge)

declare global {
  interface HTMLElementTagNameMap {
    'hc-badge': HcBadge
  }
}
