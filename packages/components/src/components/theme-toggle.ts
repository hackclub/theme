import { LitElement, css, html, svg } from 'lit'
import { define } from '../internal/define'
import { base, focusRing } from '../internal/styles'
import {
  THEME_CHANGE_EVENT,
  getThemePreference,
  setTheme,
  watchSystemTheme,
  type ThemeChangeDetail,
  type ThemePreference
} from '../theme'

const order: ThemePreference[] = ['light', 'system', 'dark']

const labels: Record<ThemePreference, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System'
}

const icons: Record<ThemePreference, ReturnType<typeof svg>> = {
  light: svg`<circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/>`,
  dark: svg`<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/>`,
  system: svg`<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17Z" fill="currentColor"/>`
}

/**
 * Cycles the color scheme between light → system → dark, persists the choice
 * and keeps every toggle on the page in sync.
 *
 * @csspart button
 */
export class HcThemeToggle extends LitElement {
  static properties = {
    variant: { reflect: true },
    preference: { state: true }
  }

  /** `icon` (round button) or `labeled` (icon and text) */
  declare variant: 'icon' | 'labeled'
  declare preference: ThemePreference

  constructor() {
    super()
    this.variant = 'icon'
    this.preference = 'system'
  }

  static styles = [
    base,
    css`
      :host {
        display: inline-flex;
      }
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 40px;
        height: 40px;
        padding: 0;
        border: 1px solid var(--hc-border);
        border-radius: var(--hc-radius-pill);
        background: var(--hc-surface);
        color: inherit;
        font: inherit;
        cursor: pointer;
        transition: background-color var(--hc-duration-base)
          var(--hc-ease-standard);
      }
      button:hover {
        background: var(--hc-surface-hover);
      }
      button:focus-visible {
        ${focusRing}
      }
      :host([variant='labeled']) button {
        width: auto;
        height: auto;
        padding: 4px 0;
        border: 0;
        background: none;
        font-family: var(--hc-font-sans);
        font-size: var(--hc-text-sm);
        opacity: 0.8;
      }
      :host([variant='labeled']) button:hover {
        opacity: 1;
      }
      svg {
        width: 20px;
        height: 20px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.8;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    `
  ]

  #onChange = (event: Event) => {
    this.preference = (
      event as CustomEvent<ThemeChangeDetail>
    ).detail.preference
  }

  connectedCallback() {
    super.connectedCallback()
    this.preference = getThemePreference()
    watchSystemTheme()
    document.addEventListener(THEME_CHANGE_EVENT, this.#onChange)
    requestAnimationFrame(() =>
      document.documentElement.classList.add('hc-theme-ready')
    )
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener(THEME_CHANGE_EVENT, this.#onChange)
  }

  #cycle() {
    const next = order[(order.indexOf(this.preference) + 1) % order.length]
    setTheme(next)
  }

  render() {
    const next = order[(order.indexOf(this.preference) + 1) % order.length]
    return html`<button
      part="button"
      type="button"
      aria-label="Theme: ${labels[this.preference]}. Switch to ${labels[next]}."
      title="Theme: ${labels[this.preference]}"
      @click=${this.#cycle}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        ${icons[this.preference]}
      </svg>
      ${this.variant === 'labeled'
        ? html`<span>${labels[this.preference]} theme</span>`
        : null}
    </button>`
  }
}

define('hc-theme-toggle', HcThemeToggle)

declare global {
  interface HTMLElementTagNameMap {
    'hc-theme-toggle': HcThemeToggle
  }
}
