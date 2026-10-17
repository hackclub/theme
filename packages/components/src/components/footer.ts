import { LitElement, css, html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { define } from '../internal/define'
import { base, focusRing } from '../internal/styles'
import './icon'
import './theme-toggle'

const DEFAULT_LOGO = 'https://assets.hackclub.com/flag-standalone-bw.svg'

const socials = [
  { label: 'GitHub', href: 'https://github.com/hackclub', glyph: 'github' },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/c/HackClubHQ',
    glyph: 'youtube'
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/starthackclub',
    glyph: 'instagram'
  },
  { label: 'Email', href: 'mailto:team@hackclub.com', glyph: 'email' }
] as const

/**
 * The hackclub.com footer: dark grid paper, logo, socials and link columns.
 * Every slot has Hack Club defaults; pass an empty element to a slot to
 * remove its default (e.g. `<span slot="end"></span>` hides the theme toggle).
 *
 * @slot - Link columns (`<hc-footer-column>`)
 * @slot logo - Replaces the Hack Club flag
 * @slot about - Text under the logo (default: "For teens, by teens.")
 * @slot social - Replaces the social icon links
 * @slot legal - Replaces the copyright line
 * @slot end - Bottom-right controls (default: `<hc-theme-toggle>`)
 * @slot art - An illustration that peeks over the top edge
 * @csspart footer
 */
export class HcFooter extends LitElement {
  static properties = {
    logoHref: { attribute: 'logo-href' }
  }

  declare logoHref: string

  constructor() {
    super()
    this.logoHref = '/'
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
        position: relative;
        /* The footer is always dark */
        --hc-foreground: var(--hc-paper);
        --hc-surface: rgba(255, 255, 255, 0.06);
        --hc-surface-hover: rgba(255, 255, 255, 0.12);
        --hc-border: rgba(255, 255, 255, 0.14);
        --hc-muted: rgba(255, 255, 255, 0.8);
        --hc-red-text: var(--hc-red-light);
        --hc-footer-grid: rgba(255, 255, 255, 0.1);
        color-scheme: dark;
        color: var(--hc-paper);
        font-family: var(--hc-font-sans);
      }
      footer {
        position: relative;
        padding: 80px clamp(24px, 6vw, 80px) 60px;
        background:
          linear-gradient(90deg, var(--hc-footer-grid) 1px, transparent 1px),
          linear-gradient(var(--hc-footer-grid) 1px, transparent 1px),
          var(--hc-black);
        background-size: 50px 50px;
      }
      .art {
        position: absolute;
        top: 0;
        right: 0;
        width: clamp(240px, 40vw, 600px);
        transform: translateY(-40%);
        pointer-events: none;
      }
      ::slotted([slot='art']) {
        display: block;
        width: 100%;
        height: auto;
      }
      .top,
      .bottom {
        max-width: var(--hc-max-width);
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
      }
      .top {
        gap: 48px 64px;
        margin-bottom: 64px;
      }
      .brand {
        flex: 0 0 280px;
        max-width: 100%;
      }
      .logo {
        display: inline-block;
        margin-bottom: 28px;
        border-radius: var(--hc-radius-md);
        color: inherit;
        text-decoration: none;
      }
      .logo:focus-visible {
        ${focusRing}
      }
      .logo img {
        display: block;
        width: 200px;
        height: auto;
        filter: invert(1);
      }
      ::slotted([slot='logo']) {
        display: block;
        max-width: 200px;
      }
      .about {
        margin-bottom: 32px;
        font-size: var(--hc-text-body);
        line-height: var(--hc-leading-snug);
      }
      .about p {
        margin: 0;
      }
      .social {
        display: flex;
        gap: 12px;
      }
      .social a,
      ::slotted([slot='social']) {
        color: inherit;
      }
      .social a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56px;
        height: 56px;
        border-radius: var(--hc-radius-md);
        opacity: 0.85;
        transition: opacity var(--hc-duration-fast) var(--hc-ease-standard);
      }
      .social a:hover {
        opacity: 1;
      }
      .social a:focus-visible {
        ${focusRing}
      }
      .columns {
        display: flex;
        flex-wrap: wrap;
        gap: 48px;
      }
      .bottom {
        align-items: flex-start;
        justify-content: space-between;
        gap: 24px;
        padding-top: 32px;
        font-size: var(--hc-text-sm);
        line-height: var(--hc-leading-normal);
      }
      .legal {
        max-width: 720px;
        opacity: 0.8;
      }
      .legal p {
        margin: 0;
      }
      .legal a,
      ::slotted([slot='legal']) {
        color: inherit;
      }

      @media (max-width: 767px) {
        footer {
          padding-top: 120px;
        }
      }
    `
  ]

  render() {
    const year = new Date().getFullYear()
    return html`<footer part="footer">
      <div class="art"><slot name="art"></slot></div>
      <div class="top">
        <div class="brand">
          <a class="logo" href=${this.logoHref}>
            <slot name="logo"><img src=${DEFAULT_LOGO} alt="Hack Club" /></slot>
          </a>
          <div class="about">
            <slot name="about"><p>For teens, by teens.</p></slot>
          </div>
          <div class="social">
            <slot name="social">
              ${socials.map(
                s =>
                  html`<a
                    href=${s.href}
                    aria-label=${s.label}
                    target=${ifDefined(
                      s.href.startsWith('http') ? '_blank' : undefined
                    )}
                    rel=${ifDefined(
                      s.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    )}
                    ><hc-icon glyph=${s.glyph} size="48"></hc-icon
                  ></a>`
              )}
            </slot>
          </div>
        </div>
        <div class="columns"><slot></slot></div>
      </div>
      <div class="bottom">
        <div class="legal">
          <slot name="legal">
            <p>
              © ${year} Hack Club. Registered under
              <a href="https://the.hackfoundation.org/">The Hack Foundation</a>,
              a 501(c)(3) nonprofit (EIN: 81-2908499).
            </p>
          </slot>
        </div>
        <slot name="end"
          ><hc-theme-toggle variant="labeled"></hc-theme-toggle
        ></slot>
      </div>
    </footer>`
  }
}

/**
 * A titled column of links inside `<hc-footer>`.
 *
 * @slot - Links
 */
export class HcFooterColumn extends LitElement {
  static properties = {
    heading: {}
  }

  declare heading: string

  constructor() {
    super()
    this.heading = ''
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
        min-width: 140px;
      }
      h2 {
        margin: 0 0 16px;
        font-family: var(--hc-font-sans);
        font-size: var(--hc-text-body);
        font-weight: 700;
        line-height: var(--hc-leading-snug);
      }
      .links {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 14px;
      }
      ::slotted(a) {
        color: inherit;
        font-size: var(--hc-text-sm);
        text-decoration: none;
        opacity: 0.8;
        transition: opacity var(--hc-duration-fast) var(--hc-ease-standard);
      }
      ::slotted(a:hover),
      ::slotted(a:focus-visible) {
        opacity: 1;
      }
    `
  ]

  render() {
    return html`<h2>${this.heading}</h2>
      <div class="links"><slot></slot></div>`
  }
}

define('hc-footer', HcFooter)
define('hc-footer-column', HcFooterColumn)

declare global {
  interface HTMLElementTagNameMap {
    'hc-footer': HcFooter
    'hc-footer-column': HcFooterColumn
  }
}
