import { LitElement, css, html } from 'lit'
import { define } from '../internal/define'
import { base, focusRing } from '../internal/styles'
import { chevronIcon } from '../internal/arrow'

const MOBILE_QUERY = '(max-width: 1023.98px)'
const DEFAULT_LOGO = 'https://assets.hackclub.com/flag-orpheus-top.svg'

let nextId = 0

/**
 * The hackclub.com navigation bar. Put links (and `<hc-nav-menu>` dropdowns)
 * in the default slot and a call to action in the `cta` slot. Below 1024px
 * they collapse into a full-screen menu.
 *
 * @slot - Links and `<hc-nav-menu>` elements
 * @slot logo - Replaces the default Hack Club flag
 * @slot cta - Call to action, usually `<hc-button size="sm">`
 * @slot end - Extra controls, e.g. `<hc-theme-toggle>`
 * @csspart bar
 * @csspart logo
 * @csspart menu
 * @csspart toggle
 */
export class HcNav extends LitElement {
  static properties = {
    logoSrc: { attribute: 'logo-src' },
    logoAlt: { attribute: 'logo-alt' },
    logoHref: { attribute: 'logo-href' },
    label: {},
    sticky: { type: Boolean, reflect: true },
    invert: { type: Boolean, reflect: true },
    open: { type: Boolean, reflect: true },
    mobile: { type: Boolean, reflect: true },
    scrolled: { type: Boolean, reflect: true }
  }

  declare logoSrc: string
  declare logoAlt: string
  declare logoHref: string
  /** Accessible name for the navigation landmark */
  declare label: string
  /** Stick to the top of the viewport and gain a frosted background once scrolled */
  declare sticky: boolean
  /** Use light text, for navs over dark heroes (until scrolled) */
  declare invert: boolean
  /** Whether the mobile menu is open */
  declare open: boolean
  declare mobile: boolean
  declare scrolled: boolean

  #menuId = `hc-nav-menu-${nextId++}`
  #query?: MediaQueryList

  constructor() {
    super()
    this.logoSrc = DEFAULT_LOGO
    this.logoAlt = 'Hack Club'
    this.logoHref = '/'
    this.label = 'Main'
    this.sticky = false
    this.invert = false
    this.open = false
    this.mobile = false
    this.scrolled = false
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
        position: relative;
        z-index: 100;
        color: var(--hc-foreground);
        font-family: var(--hc-font-sans);
      }
      :host([sticky]) {
        position: sticky;
        top: 0;
      }
      :host([invert]:not([scrolled]):not([open])) {
        color: var(--hc-cream);
      }

      .bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--hc-space-6);
        height: var(--hc-nav-height);
        padding: 0 clamp(16px, 4vw, 55px) 0 clamp(16px, 3vw, 32px);
        border-bottom: 1px solid transparent;
        transition:
          background-color var(--hc-duration-base) var(--hc-ease-out),
          border-color var(--hc-duration-base) var(--hc-ease-out);
      }
      :host([sticky][scrolled]) .bar {
        background: var(--hc-nav-bg);
        border-bottom-color: var(--hc-border);
        -webkit-backdrop-filter: blur(16px);
        backdrop-filter: blur(16px);
      }
      /* backdrop-filter would become the containing block of the fixed mobile menu */
      :host([open]) .bar {
        background: var(--hc-background);
        border-bottom-color: var(--hc-border);
        -webkit-backdrop-filter: none;
        backdrop-filter: none;
      }

      .logo {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        border-radius: var(--hc-radius-md);
        color: inherit;
        text-decoration: none;
      }
      .logo:focus-visible {
        ${focusRing}
      }
      .logo img,
      ::slotted([slot='logo']) {
        display: block;
        height: 48px;
        width: auto;
      }

      .menu {
        display: flex;
        align-items: center;
        gap: var(--hc-space-6);
      }
      ::slotted(a) {
        color: inherit;
        font-size: var(--hc-text-body);
        text-decoration: none;
        transition: opacity var(--hc-duration-fast) var(--hc-ease-standard);
      }
      ::slotted(a:hover) {
        opacity: 0.6;
      }
      ::slotted(a[aria-current='page']) {
        font-weight: 700;
      }

      .toggle {
        display: none;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        width: 44px;
        height: 44px;
        padding: 9px;
        border: 0;
        border-radius: var(--hc-radius-md);
        background: none;
        color: inherit;
        cursor: pointer;
      }
      .toggle:focus-visible {
        ${focusRing}
      }
      .toggle span {
        display: block;
        width: 26px;
        height: 3px;
        border-radius: 2px;
        background: currentColor;
        transition:
          transform var(--hc-duration-medium) var(--hc-ease-out),
          opacity var(--hc-duration-base) var(--hc-ease-out);
      }
      :host([open]) .toggle span:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }
      :host([open]) .toggle span:nth-child(2) {
        opacity: 0;
      }
      :host([open]) .toggle span:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }

      /* Mobile: the menu becomes a full-screen sheet */
      :host([mobile]) .toggle {
        display: flex;
      }
      :host([mobile]) .menu {
        position: fixed;
        inset: var(--hc-nav-height) 0 0;
        flex-direction: column;
        align-items: stretch;
        gap: var(--hc-space-2);
        padding: var(--hc-space-6) var(--hc-space-6) var(--hc-space-12);
        overflow-y: auto;
        background: var(--hc-nav-bg);
        -webkit-backdrop-filter: blur(14px);
        backdrop-filter: blur(14px);
        color: var(--hc-foreground);
        visibility: hidden;
        opacity: 0;
        transform: translateY(-8px);
        transition:
          opacity var(--hc-duration-base) var(--hc-ease-out),
          transform var(--hc-duration-base) var(--hc-ease-out),
          visibility 0s linear var(--hc-duration-base);
      }
      :host([mobile][open]) .menu {
        visibility: visible;
        opacity: 1;
        transform: none;
        transition:
          opacity var(--hc-duration-base) var(--hc-ease-out),
          transform var(--hc-duration-base) var(--hc-ease-out);
      }
      :host([mobile]) ::slotted(a) {
        padding: var(--hc-space-3) 0;
        font-size: var(--hc-text-lg);
      }
      :host([mobile]) ::slotted([slot='cta']) {
        margin-top: var(--hc-space-4);
      }
      :host([mobile]) ::slotted([slot='end']) {
        align-self: center;
        margin-top: var(--hc-space-4);
      }

      @media (prefers-reduced-motion: reduce) {
        .bar,
        .menu,
        .toggle span {
          transition: none !important;
        }
      }
    `
  ]

  #onScroll = () => {
    const scrolled = window.scrollY > 8
    if (scrolled !== this.scrolled) this.scrolled = scrolled
  }

  #onMedia = () => {
    this.mobile = !!this.#query?.matches
    if (!this.mobile) this.open = false
    for (const menu of this.querySelectorAll('hc-nav-menu')) {
      menu.stacked = this.mobile
    }
  }

  #onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.open) {
      this.open = false
      this.renderRoot.querySelector<HTMLButtonElement>('.toggle')?.focus()
    }
  }

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('scroll', this.#onScroll, { passive: true })
    document.addEventListener('keydown', this.#onKeyDown)
    this.#query = matchMedia(MOBILE_QUERY)
    this.#query.addEventListener('change', this.#onMedia)
    this.#onMedia()
    this.#onScroll()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('scroll', this.#onScroll)
    document.removeEventListener('keydown', this.#onKeyDown)
    this.#query?.removeEventListener('change', this.#onMedia)
    document.documentElement.style.removeProperty('overflow')
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('open')) {
      // Lock page scroll behind the mobile menu
      if (this.open && this.mobile) {
        document.documentElement.style.overflow = 'hidden'
      } else {
        document.documentElement.style.removeProperty('overflow')
      }
      this.dispatchEvent(new Event('hc-toggle', { bubbles: true }))
    }
  }

  #onMenuClick(event: Event) {
    // Close the mobile menu after following a link
    const link = event
      .composedPath()
      .find(el => el instanceof HTMLAnchorElement)
    if (link && this.mobile) this.open = false
  }

  #onSlotChange() {
    this.#onMedia()
  }

  render() {
    return html`<div class="bar" part="bar">
      <a class="logo" part="logo" href=${this.logoHref}>
        <slot name="logo"><img src=${this.logoSrc} alt=${this.logoAlt} /></slot>
      </a>
      <button
        class="toggle"
        part="toggle"
        type="button"
        aria-label=${this.open ? 'Close menu' : 'Open menu'}
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-controls=${this.#menuId}
        @click=${() => (this.open = !this.open)}
      >
        <span></span><span></span><span></span>
      </button>
      <nav
        class="menu"
        part="menu"
        id=${this.#menuId}
        aria-label=${this.label}
        ?inert=${this.mobile && !this.open}
        @click=${this.#onMenuClick}
      >
        <slot @slotchange=${this.#onSlotChange}></slot>
        <slot name="cta"></slot>
        <slot name="end"></slot>
      </nav>
    </div>`
  }
}

/**
 * A dropdown inside `<hc-nav>`. Opens on hover or click on desktop, and
 * expands inline in the mobile menu.
 *
 * @slot - Links
 * @csspart trigger
 * @csspart panel
 */
export class HcNavMenu extends LitElement {
  static properties = {
    label: {},
    open: { type: Boolean, reflect: true },
    stacked: { type: Boolean, reflect: true },
    align: { reflect: true }
  }

  declare label: string
  declare open: boolean
  /** Set by `<hc-nav>` in the mobile layout */
  declare stacked: boolean
  /** Which edge of the trigger the panel aligns to */
  declare align: 'start' | 'end'

  #panelId = `hc-nav-dropdown-${nextId++}`
  #closeTimer?: ReturnType<typeof setTimeout>

  constructor() {
    super()
    this.label = 'Menu'
    this.open = false
    this.stacked = false
    this.align = 'start'
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
        position: relative;
      }
      .trigger {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 0;
        border: 0;
        background: none;
        color: inherit;
        font: inherit;
        font-size: var(--hc-text-body);
        cursor: pointer;
        transition: opacity var(--hc-duration-fast) var(--hc-ease-standard);
      }
      .trigger:hover {
        opacity: 0.6;
      }
      .trigger:focus-visible {
        ${focusRing}
        border-radius: var(--hc-radius-sm);
      }
      .trigger svg {
        transition: transform var(--hc-duration-base) var(--hc-ease-out);
      }
      :host([open]) .trigger svg {
        transform: rotate(180deg);
      }

      .panel {
        position: absolute;
        top: calc(100% + 12px);
        left: -16px;
        display: none;
        flex-direction: column;
        gap: 2px;
        min-width: 220px;
        padding: 8px;
        border-radius: var(--hc-radius-lg);
        background: var(--hc-surface);
        box-shadow: var(--hc-shadow-popover);
        color: var(--hc-foreground);
        animation: dd-in var(--hc-duration-base) var(--hc-ease-out);
      }
      /* Bridge the gap so the pointer can travel from trigger to panel */
      .panel::before {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 0;
        right: 0;
        height: 12px;
      }
      :host([align='end']) .panel {
        left: auto;
        right: -16px;
      }
      :host([open]) .panel {
        display: flex;
      }
      @keyframes dd-in {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
      }

      ::slotted(a) {
        display: block;
        padding: 10px 20px;
        border-radius: var(--hc-radius-md);
        color: inherit;
        font-size: var(--hc-text-md);
        text-decoration: none;
        white-space: nowrap;
        transition:
          padding var(--hc-duration-base) var(--hc-ease-out),
          color var(--hc-duration-base) var(--hc-ease-out),
          background-color var(--hc-duration-base) var(--hc-ease-out),
          box-shadow var(--hc-duration-base) var(--hc-ease-out);
      }
      ::slotted(a:hover),
      ::slotted(a:focus-visible) {
        padding-left: 26px;
        background: var(--hc-background);
        color: var(--hc-red-text);
        box-shadow: 0 4px 12px rgba(236, 55, 80, 0.12);
        outline: none;
      }

      /* Mobile: an inline disclosure */
      :host([stacked]) .trigger {
        width: 100%;
        justify-content: space-between;
        padding: var(--hc-space-3) 0;
        font-size: var(--hc-text-lg);
      }
      :host([stacked]) .panel {
        position: static;
        min-width: 0;
        padding: 0 0 var(--hc-space-2) var(--hc-space-3);
        background: none;
        box-shadow: none;
      }
      :host([stacked]) .panel::before {
        display: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .panel {
          animation: none;
        }
        .trigger svg,
        ::slotted(a) {
          transition: none;
        }
      }
    `
  ]

  #onDocumentClick = (event: Event) => {
    if (this.open && !event.composedPath().includes(this)) this.open = false
  }

  #onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.open) {
      event.stopPropagation()
      this.open = false
      this.renderRoot.querySelector<HTMLButtonElement>('.trigger')?.focus()
    }
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('click', this.#onDocumentClick)
    this.addEventListener('keydown', this.#onKeyDown)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener('click', this.#onDocumentClick)
    this.removeEventListener('keydown', this.#onKeyDown)
    clearTimeout(this.#closeTimer)
  }

  #onPointerEnter(event: PointerEvent) {
    if (this.stacked || event.pointerType !== 'mouse') return
    clearTimeout(this.#closeTimer)
    this.open = true
  }

  #onPointerLeave(event: PointerEvent) {
    if (this.stacked || event.pointerType !== 'mouse') return
    this.#closeTimer = setTimeout(() => (this.open = false), 150)
  }

  #onFocusOut(event: FocusEvent) {
    if (this.stacked) return
    const next = event.relatedTarget as Node | null
    if (!next || !this.contains(next)) this.open = false
  }

  render() {
    return html`<div
      @pointerenter=${this.#onPointerEnter}
      @pointerleave=${this.#onPointerLeave}
      @focusout=${this.#onFocusOut}
    >
      <button
        class="trigger"
        part="trigger"
        type="button"
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-controls=${this.#panelId}
        @click=${() => (this.open = !this.open)}
      >
        ${this.label} ${chevronIcon}
      </button>
      <div class="panel" part="panel" id=${this.#panelId}>
        <slot></slot>
      </div>
    </div>`
  }
}

define('hc-nav', HcNav)
define('hc-nav-menu', HcNavMenu)

declare global {
  interface HTMLElementTagNameMap {
    'hc-nav': HcNav
    'hc-nav-menu': HcNavMenu
  }
}
