import { LitElement, css, html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { live } from 'lit/directives/live.js'
import { define } from '../internal/define'
import { base, srOnly } from '../internal/styles'

let nextId = 0

/**
 * A pill-shaped text field that participates in forms.
 *
 * @fires change - When the value is committed
 * @fires input - On every keystroke (native, composed)
 * @csspart label
 * @csspart input
 * @csspart hint
 * @csspart error
 */
export class HcInput extends LitElement {
  static formAssociated = true
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true
  }

  static properties = {
    label: {},
    hideLabel: { type: Boolean, attribute: 'hide-label' },
    name: { reflect: true },
    type: {},
    value: {},
    placeholder: {},
    autocomplete: {},
    inputmode: {},
    hint: {},
    error: { reflect: true },
    required: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    readonly: { type: Boolean, reflect: true },
    minlength: { type: Number },
    maxlength: { type: Number },
    pattern: {}
  }

  declare label?: string
  declare hideLabel: boolean
  declare name?: string
  declare type: string
  declare value: string
  declare placeholder?: string
  declare autocomplete?: string
  declare inputmode?: string
  declare hint?: string
  /** Error message; setting it marks the field invalid */
  declare error?: string
  declare required: boolean
  declare disabled: boolean
  declare readonly: boolean
  declare minlength?: number
  declare maxlength?: number
  declare pattern?: string

  #internals?: ElementInternals
  #id = `hc-input-${nextId++}`
  #defaultValue = ''

  constructor() {
    super()
    this.type = 'text'
    this.value = ''
    this.hideLabel = false
    this.required = false
    this.disabled = false
    this.readonly = false
    // Optional so the element still works where ElementInternals is missing
    this.#internals = this.attachInternals?.()
  }

  static styles = [
    base,
    srOnly,
    css`
      :host {
        display: block;
        font-family: var(--hc-font-sans);
      }
      label {
        display: block;
        margin-bottom: var(--hc-space-2);
        font-size: var(--hc-text-md);
        font-weight: 600;
      }
      input {
        display: block;
        width: 100%;
        height: 52px;
        padding: 0 24px;
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
      input:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .hint,
      .error {
        margin: var(--hc-space-2) 0 0 var(--hc-space-6);
        font-size: var(--hc-text-sm);
      }
      .hint {
        color: var(--hc-muted);
      }
      .error {
        color: var(--hc-red-text);
        font-weight: 600;
      }
    `
  ]

  get form(): HTMLFormElement | null {
    return this.#internals?.form ?? this.closest('form')
  }

  get validity(): ValidityState | undefined {
    return this.#internals?.validity ?? this.#input?.validity
  }

  get validationMessage(): string {
    return (
      this.#internals?.validationMessage ?? this.#input?.validationMessage ?? ''
    )
  }

  get #input() {
    return this.renderRoot?.querySelector('input') ?? null
  }

  checkValidity(): boolean {
    return (
      this.#internals?.checkValidity() ?? this.#input?.checkValidity() ?? true
    )
  }

  reportValidity(): boolean {
    return (
      this.#internals?.reportValidity() ?? this.#input?.reportValidity() ?? true
    )
  }

  connectedCallback() {
    super.connectedCallback()
    this.#defaultValue = this.getAttribute('value') ?? ''
  }

  formResetCallback() {
    this.value = this.#defaultValue
  }

  formStateRestoreCallback(state: string) {
    this.value = state
  }

  updated() {
    this.#internals?.setFormValue(this.value)
    this.#syncValidity()
  }

  #syncValidity() {
    const input = this.#input
    if (!input || !this.#internals) return
    if (this.error) {
      this.#internals.setValidity({ customError: true }, this.error, input)
    } else if (!input.validity.valid) {
      this.#internals.setValidity(
        input.validity,
        input.validationMessage,
        input
      )
    } else {
      this.#internals.setValidity({})
    }
  }

  #onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value
  }

  #onChange() {
    this.dispatchEvent(new Event('change', { bubbles: true }))
  }

  render() {
    const describedBy = this.error
      ? `${this.#id}-error`
      : this.hint
        ? `${this.#id}-hint`
        : undefined
    return html`
      ${this.label
        ? html`<label
            part="label"
            for=${this.#id}
            class=${this.hideLabel ? 'sr-only' : ''}
            >${this.label}</label
          >`
        : nothing}
      <input
        part="input"
        id=${this.#id}
        type=${this.type}
        name=${ifDefined(this.name)}
        .value=${live(this.value)}
        placeholder=${ifDefined(this.placeholder)}
        autocomplete=${ifDefined(this.autocomplete as any)}
        inputmode=${ifDefined(this.inputmode as any)}
        minlength=${ifDefined(this.minlength)}
        maxlength=${ifDefined(this.maxlength)}
        pattern=${ifDefined(this.pattern)}
        aria-label=${ifDefined(this.label ? undefined : this.placeholder)}
        aria-invalid=${this.error ? 'true' : 'false'}
        aria-describedby=${ifDefined(describedBy)}
        ?required=${this.required}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        @input=${this.#onInput}
        @change=${this.#onChange}
      />
      ${this.error
        ? html`<p
            part="error"
            class="error"
            id="${this.#id}-error"
            role="alert"
          >
            ${this.error}
          </p>`
        : this.hint
          ? html`<p part="hint" class="hint" id="${this.#id}-hint">
              ${this.hint}
            </p>`
          : nothing}
    `
  }
}

define('hc-input', HcInput)

declare global {
  interface HTMLElementTagNameMap {
    'hc-input': HcInput
  }
}
