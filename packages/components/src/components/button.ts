import { LitElement, css, html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { define } from '../internal/define'
import { base, focusRing } from '../internal/styles'
import { arrowIcon } from '../internal/arrow'

export type ButtonVariant =
  | 'primary'
  | 'red'
  | 'secondary'
  | 'outline'
  | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

/**
 * The pill button from hackclub.com. Renders a link when `href` is set.
 *
 * @slot - Label
 * @slot start - Content before the label, e.g. an `<hc-icon>`
 * @slot end - Content after the label (replaces the arrow)
 * @csspart control - The inner `<a>` or `<button>`
 */
export class HcButton extends LitElement {
  static formAssociated = true
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true
  }

  static properties = {
    variant: { reflect: true },
    size: { reflect: true },
    href: {},
    target: {},
    rel: {},
    download: {},
    type: {},
    name: {},
    value: {},
    disabled: { type: Boolean, reflect: true },
    arrow: { type: Boolean, reflect: true }
  }

  declare variant: ButtonVariant
  declare size: ButtonSize
  declare href?: string
  declare target?: string
  declare rel?: string
  declare download?: string
  declare type: 'button' | 'submit' | 'reset'
  declare name?: string
  declare value?: string
  declare disabled: boolean
  /** Show the arrow that nudges right on hover */
  declare arrow: boolean

  #internals?: ElementInternals

  constructor() {
    super()
    this.variant = 'primary'
    this.size = 'md'
    this.type = 'submit'
    this.disabled = false
    this.arrow = false
    // Optional so the element still works where ElementInternals is missing
    this.#internals = this.attachInternals?.()
  }

  get form(): HTMLFormElement | null {
    return this.#internals?.form ?? this.closest('form')
  }

  static styles = [
    base,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
        --hc-button-bg: var(--hc-foreground);
        --hc-button-fg: var(--hc-background);
        --hc-button-bg-hover: var(--hc-red);
        --hc-button-fg-hover: var(--hc-paper);
        --hc-button-border: transparent;
        --hc-button-height: 52px;
        --hc-button-padding: 0 36px;
        --hc-button-font-size: var(--hc-text-body);
      }
      :host([variant='red']) {
        --hc-button-bg: var(--hc-red);
        --hc-button-fg: var(--hc-paper);
        --hc-button-bg-hover: var(--hc-red);
      }
      :host([variant='secondary']) {
        --hc-button-bg: var(--hc-surface-hover);
        --hc-button-fg: var(--hc-foreground);
        --hc-button-bg-hover: var(--hc-foreground);
        --hc-button-fg-hover: var(--hc-background);
      }
      :host([variant='outline']) {
        --hc-button-bg: transparent;
        --hc-button-fg: var(--hc-foreground);
        --hc-button-border: var(--hc-foreground);
        --hc-button-bg-hover: var(--hc-foreground);
        --hc-button-fg-hover: var(--hc-background);
      }
      :host([variant='ghost']) {
        --hc-button-bg: transparent;
        --hc-button-fg: var(--hc-foreground);
        --hc-button-bg-hover: var(--hc-surface-hover);
        --hc-button-fg-hover: var(--hc-foreground);
      }
      :host([size='sm']) {
        --hc-button-height: 44px;
        --hc-button-padding: 0 20px;
        --hc-button-font-size: var(--hc-text-md);
      }
      :host([size='lg']) {
        --hc-button-height: 60px;
        --hc-button-padding: 0 44px;
        --hc-button-font-size: var(--hc-text-lg);
      }

      .control {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        min-height: var(--hc-button-height);
        padding: var(--hc-button-padding);
        border: 2px solid var(--hc-button-border);
        border-radius: var(--hc-radius-pill);
        background: var(--hc-button-bg);
        color: var(--hc-button-fg);
        font-family: var(--hc-font-sans);
        font-size: var(--hc-button-font-size);
        font-weight: 400;
        line-height: 1;
        text-decoration: none;
        white-space: nowrap;
        cursor: pointer;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        transition:
          background-color var(--hc-duration-slow) var(--hc-ease-standard),
          color var(--hc-duration-slow) var(--hc-ease-standard),
          border-color var(--hc-duration-slow) var(--hc-ease-standard),
          filter var(--hc-duration-base) var(--hc-ease-standard),
          transform var(--hc-duration-fast) var(--hc-ease-out);
      }
      .control:hover {
        background: var(--hc-button-bg-hover);
        color: var(--hc-button-fg-hover);
        border-color: var(--hc-button-bg-hover);
      }
      :host([variant='red']) .control:hover {
        filter: brightness(1.12);
      }
      :host([variant='outline']) .control:hover {
        border-color: var(--hc-button-bg-hover);
      }
      .control:active {
        transform: scale(0.98);
      }
      .control:focus-visible {
        ${focusRing}
      }
      :host([disabled]) .control {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }

      .arrow {
        display: inline-flex;
        margin-left: -2px;
        transition: transform var(--hc-duration-base) var(--hc-ease-standard);
      }
      .control:hover .arrow {
        transform: translateX(5px);
      }

      ::slotted(hc-icon) {
        margin-inline: -4px;
      }

      @media (prefers-reduced-motion: reduce) {
        .control,
        .arrow {
          transition: none;
        }
        .control:hover .arrow {
          transform: none;
        }
      }
    `
  ]

  #onClick() {
    if (this.disabled) return
    const form = this.form
    if (!form) return
    if (this.type === 'submit') form.requestSubmit()
    else if (this.type === 'reset') form.reset()
  }

  render() {
    const content = html`<slot name="start"></slot><slot></slot
      ><slot name="end"
        >${this.arrow
          ? html`<span class="arrow" part="arrow">${arrowIcon}</span>`
          : nothing}</slot
      >`

    if (this.href && !this.disabled) {
      const rel =
        this.rel ??
        (this.target === '_blank' ? 'noopener noreferrer' : undefined)
      return html`<a
        class="control"
        part="control"
        href=${this.href}
        target=${ifDefined(this.target)}
        rel=${ifDefined(rel)}
        download=${ifDefined(this.download)}
        >${content}</a
      >`
    }

    return html`<button
      class="control"
      part="control"
      type="button"
      ?disabled=${this.disabled}
      aria-disabled=${this.disabled ? 'true' : 'false'}
      @click=${this.#onClick}
    >
      ${content}
    </button>`
  }
}

define('hc-button', HcButton)

declare global {
  interface HTMLElementTagNameMap {
    'hc-button': HcButton
  }
}
