import { LitElement, css, html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { define } from '../internal/define'
import { base, focusRing } from '../internal/styles'

/**
 * A tilted photo with a white border, as scattered across the hackclub.com
 * hero. Straightens and lifts on hover.
 *
 * @slot caption - Optional caption (or use the `caption` attribute)
 * @csspart frame
 * @csspart image
 * @cssprop --hc-polaroid-width - Width (default 240px)
 */
export class HcPolaroid extends LitElement {
  static properties = {
    src: {},
    alt: {},
    caption: {},
    rotate: { type: Number }
  }

  declare src: string
  declare alt: string
  declare caption?: string
  /** Rotation in degrees */
  declare rotate: number

  constructor() {
    super()
    this.src = ''
    this.alt = ''
    this.rotate = -4
  }

  static styles = [
    base,
    css`
      :host {
        display: inline-block;
        --hc-polaroid-width: 240px;
      }
      figure {
        width: var(--hc-polaroid-width);
        margin: 0;
        border: 4px solid var(--hc-paper);
        border-radius: var(--hc-radius-photo);
        background: var(--hc-paper);
        box-shadow: var(--hc-shadow-photo);
        transform: rotate(var(--r));
        transition:
          transform var(--hc-duration-medium) var(--hc-ease-playful),
          box-shadow var(--hc-duration-medium) var(--hc-ease-playful);
      }
      figure:hover {
        transform: rotate(0deg) translateY(-6px) scale(1.03);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.22);
      }
      img {
        display: block;
        width: 100%;
        height: auto;
        border-radius: calc(var(--hc-radius-photo) - 4px);
      }
      figcaption {
        padding: 10px 6px 6px;
        color: var(--hc-ink);
        font-family: var(--hc-font-sans);
        font-size: var(--hc-text-sm);
        text-align: center;
      }
      @media (prefers-reduced-motion: reduce) {
        figure {
          transition: none;
        }
        figure:hover {
          transform: rotate(var(--r));
        }
      }
    `
  ]

  render() {
    const hasCaption = this.caption || this.querySelector('[slot="caption"]')
    return html`<figure part="frame" style="--r: ${this.rotate || 0}deg">
      <img part="image" src=${this.src} alt=${this.alt} loading="lazy" />
      ${hasCaption
        ? html`<figcaption>
            <slot name="caption">${this.caption}</slot>
          </figcaption>`
        : nothing}
    </figure>`
  }
}

/**
 * A die-cut sticker. Set `movable` to let visitors drag it around (with the
 * pointer, or with arrow keys once focused).
 *
 * @csspart image
 * @cssprop --hc-sticker-width - Width (default 120px)
 */
export class HcSticker extends LitElement {
  static properties = {
    src: {},
    alt: {},
    rotate: { type: Number },
    movable: { type: Boolean, reflect: true },
    dragging: { type: Boolean, reflect: true }
  }

  declare src: string
  declare alt: string
  /** Rotation in degrees */
  declare rotate: number
  declare movable: boolean
  declare dragging: boolean

  #x = 0
  #y = 0
  #start: { x: number; y: number; px: number; py: number } | null = null

  constructor() {
    super()
    this.src = ''
    this.alt = ''
    this.rotate = 6
    this.movable = false
    this.dragging = false
  }

  static styles = [
    base,
    css`
      :host {
        display: inline-block;
        --hc-sticker-width: 120px;
        touch-action: auto;
      }
      :host([movable]) {
        cursor: grab;
        touch-action: none;
      }
      :host([dragging]) {
        cursor: grabbing;
        z-index: 10;
      }
      .sticker {
        display: block;
        transform: translate(var(--x, 0), var(--y, 0)) rotate(var(--r));
        transition: transform var(--hc-duration-medium) var(--hc-ease-playful);
      }
      :host([dragging]) .sticker {
        transition: none;
      }
      :host([movable]) .sticker:focus-visible {
        ${focusRing}
        border-radius: var(--hc-radius-md);
      }
      img {
        display: block;
        width: var(--hc-sticker-width);
        height: auto;
        filter: drop-shadow(var(--hc-shadow-sticker));
        transition:
          transform var(--hc-duration-medium) var(--hc-ease-playful),
          filter var(--hc-duration-medium) var(--hc-ease-playful);
        user-select: none;
        -webkit-user-drag: none;
      }
      .sticker:hover img,
      :host([dragging]) img {
        transform: scale(1.06);
        filter: drop-shadow(var(--hc-shadow-sticker-hover));
      }
      @media (prefers-reduced-motion: reduce) {
        .sticker,
        img {
          transition: none;
        }
      }
    `
  ]

  #apply() {
    const el = this.renderRoot.querySelector<HTMLElement>('.sticker')
    el?.style.setProperty('--x', `${this.#x}px`)
    el?.style.setProperty('--y', `${this.#y}px`)
  }

  #onPointerDown(event: PointerEvent) {
    if (!this.movable || event.button !== 0) return
    const el = event.currentTarget as HTMLElement
    el.setPointerCapture(event.pointerId)
    this.#start = {
      x: this.#x,
      y: this.#y,
      px: event.clientX,
      py: event.clientY
    }
    this.dragging = true
    event.preventDefault()
  }

  #onPointerMove(event: PointerEvent) {
    if (!this.#start) return
    this.#x = this.#start.x + event.clientX - this.#start.px
    this.#y = this.#start.y + event.clientY - this.#start.py
    this.#apply()
  }

  #onPointerUp() {
    if (!this.#start) return
    this.#start = null
    this.dragging = false
    this.dispatchEvent(
      new CustomEvent('hc-move', {
        detail: { x: this.#x, y: this.#y },
        bubbles: true
      })
    )
  }

  #onKeyDown(event: KeyboardEvent) {
    if (!this.movable) return
    const step = event.shiftKey ? 40 : 10
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step]
    }
    const move = moves[event.key]
    if (!move) return
    event.preventDefault()
    this.#x += move[0]
    this.#y += move[1]
    this.#apply()
  }

  render() {
    return html`<span
      class="sticker"
      style="--r: ${this.rotate || 0}deg"
      tabindex=${ifDefined(this.movable ? '0' : undefined)}
      role=${ifDefined(this.movable ? 'group' : undefined)}
      aria-roledescription=${ifDefined(
        this.movable ? 'movable sticker' : undefined
      )}
      aria-label=${ifDefined(
        this.movable
          ? `${this.alt || 'Sticker'}. Use arrow keys to move.`
          : undefined
      )}
      @pointerdown=${this.#onPointerDown}
      @pointermove=${this.#onPointerMove}
      @pointerup=${this.#onPointerUp}
      @pointercancel=${this.#onPointerUp}
      @keydown=${this.#onKeyDown}
    >
      <img part="image" src=${this.src} alt=${this.alt} draggable="false" />
    </span>`
  }
}

define('hc-polaroid', HcPolaroid)
define('hc-sticker', HcSticker)

declare global {
  interface HTMLElementTagNameMap {
    'hc-polaroid': HcPolaroid
    'hc-sticker': HcSticker
  }
}
