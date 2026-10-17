import { LitElement, css, html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { define } from '../internal/define'
import { base, focusRing, srOnly } from '../internal/styles'

export interface EmailSignupDetail {
  email: string
}

export type EmailSignupStatus = 'idle' | 'loading' | 'success'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * The homepage email capture: a pill input with a "Join" button inside it.
 *
 * Without an `action`, submitting fires a cancelable `hc-submit` event and
 * nothing else — handle the request yourself and set `status`. With an
 * `action`, the form submits natively unless `hc-submit` is canceled.
 *
 * @fires hc-submit - `{ email }` when a valid address is submitted
 * @csspart form
 * @csspart input
 * @csspart button
 * @csspart error
 */
export class HcEmailSignup extends LitElement {
  static properties = {
    action: {},
    method: {},
    name: {},
    label: {},
    placeholder: {},
    buttonLabel: { attribute: 'button-label' },
    invalidMessage: { attribute: 'invalid-message' },
    successMessage: { attribute: 'success-message' },
    status: { reflect: true },
    error: { reflect: true }
  }

  declare action?: string
  declare method: string
  declare name: string
  declare label: string
  declare placeholder: string
  declare buttonLabel: string
  declare invalidMessage: string
  declare successMessage: string
  declare status: EmailSignupStatus
  /** Error shown in the tooltip; set it after a failed request */
  declare error?: string

  constructor() {
    super()
    this.method = 'post'
    this.name = 'email'
    this.label = 'Email address'
    this.placeholder = 'orpheus@hackclub.com'
    this.buttonLabel = 'Join'
    this.invalidMessage = 'Please enter a valid email address'
    this.successMessage = 'Thanks! Check your inbox.'
    this.status = 'idle'
  }

  static styles = [
    base,
    srOnly,
    css`
      :host {
        display: block;
        max-width: 480px;
        font-family: var(--hc-font-sans);
      }
      form {
        position: relative;
      }
      input {
        display: block;
        width: 100%;
        height: clamp(48px, 12vw, 56px);
        padding: 0 120px 0 24px;
        border: 0;
        border-radius: var(--hc-radius-pill);
        background: var(--hc-surface-hover);
        color: var(--hc-foreground);
        font: inherit;
        font-size: var(--hc-text-body);
        outline: none;
        transition: box-shadow var(--hc-duration-base) var(--hc-ease-standard);
      }
      input::placeholder {
        color: var(--hc-foreground);
        opacity: 0.5;
      }
      input:focus-visible {
        box-shadow: 0 0 0 3px rgba(236, 55, 80, 0.35);
      }
      :host([error]) input {
        box-shadow: 0 0 0 2px var(--hc-red);
      }
      button {
        position: absolute;
        top: 6px;
        right: 6px;
        bottom: 6px;
        min-width: 88px;
        padding: 0 22px;
        border: 0;
        border-radius: var(--hc-radius-pill);
        background: var(--hc-foreground);
        color: var(--hc-background);
        font: inherit;
        font-size: var(--hc-text-md);
        cursor: pointer;
        transition:
          background-color var(--hc-duration-slow) var(--hc-ease-standard),
          color var(--hc-duration-slow) var(--hc-ease-standard),
          transform var(--hc-duration-fast) var(--hc-ease-out);
      }
      button:hover {
        background: var(--hc-red);
        color: var(--hc-paper);
      }
      button:active {
        transform: scale(0.97);
      }
      button:focus-visible {
        ${focusRing}
      }
      button:disabled {
        opacity: 0.6;
        cursor: progress;
      }
      .error {
        position: absolute;
        top: calc(100% + 10px);
        left: 16px;
        z-index: 1;
        margin: 0;
        padding: 6px 12px;
        border-radius: var(--hc-radius-sm);
        background: var(--hc-red);
        color: var(--hc-paper);
        font-size: var(--hc-text-sm);
        font-weight: 600;
        white-space: nowrap;
      }
      .error::before {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 18px;
        border: 6px solid transparent;
        border-bottom-color: var(--hc-red);
      }
      .success {
        display: flex;
        align-items: center;
        min-height: 52px;
        margin: 0;
        padding: 0 24px;
        border-radius: var(--hc-radius-pill);
        background: color-mix(in srgb, var(--hc-green) 18%, transparent);
        font-size: var(--hc-text-body);
      }
    `
  ]

  get #input() {
    return this.renderRoot.querySelector('input')!
  }

  #onSubmit(event: SubmitEvent) {
    const email = this.#input.value.trim()
    if (!EMAIL_PATTERN.test(email)) {
      event.preventDefault()
      this.error = this.invalidMessage
      this.#input.focus()
      return
    }
    this.error = undefined
    const proceed = this.dispatchEvent(
      new CustomEvent<EmailSignupDetail>('hc-submit', {
        detail: { email },
        bubbles: true,
        composed: true,
        cancelable: true
      })
    )
    if (!this.action || !proceed) event.preventDefault()
  }

  #onInput() {
    if (this.error) this.error = undefined
  }

  render() {
    if (this.status === 'success') {
      return html`<p class="success" part="success" role="status">
        ${this.successMessage}
      </p>`
    }
    return html`<form
      part="form"
      action=${ifDefined(this.action)}
      method=${this.method}
      novalidate
      @submit=${this.#onSubmit}
    >
      <label class="sr-only" for="email">${this.label}</label>
      <input
        part="input"
        id="email"
        type="email"
        name=${this.name}
        autocomplete="email"
        inputmode="email"
        placeholder=${this.placeholder}
        aria-invalid=${this.error ? 'true' : 'false'}
        aria-describedby=${ifDefined(this.error ? 'error' : undefined)}
        required
        @input=${this.#onInput}
      />
      <button
        part="button"
        type="submit"
        ?disabled=${this.status === 'loading'}
      >
        ${this.status === 'loading' ? '…' : this.buttonLabel}
      </button>
      ${this.error
        ? html`<p class="error" part="error" id="error" role="alert">
            ${this.error}
          </p>`
        : nothing}
    </form>`
  }
}

define('hc-email-signup', HcEmailSignup)

declare global {
  interface HTMLElementTagNameMap {
    'hc-email-signup': HcEmailSignup
  }
}
