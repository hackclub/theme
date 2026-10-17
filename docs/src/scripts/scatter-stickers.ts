/**
 * Scatters stickers into the empty space of any element with
 * `data-stickers="<count>"`, without covering its content.
 * Placement is random on every load and recomputed when the layout changes.
 */

const STICKERS = Array.from(
  { length: 11 },
  (_, i) => `https://hackclub.com/assets/hero_sticker${i + 1}.webp`
)
/** Already used in the hero */
const HERO = new Set([1, 3].map(n => STICKERS[n - 1]))

const GAP_CONTENT = 24
const GAP_STICKER = 16
const EDGE = 12
const ATTEMPTS = 120

interface Rect {
  x: number
  y: number
  w: number
  h: number
}

interface Sticker {
  src: string
  ratio: number
  rotate: number
  el?: HTMLElement
}

const random = (min: number, max: number) => min + Math.random() * (max - min)

const shuffle = <T>(list: T[]) => {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const intersects = (a: Rect, b: Rect, gap: number) =>
  a.x < b.x + b.w + gap &&
  b.x < a.x + a.w + gap &&
  a.y < b.y + b.h + gap &&
  b.y < a.y + a.h + gap

const loadRatio = (src: string) =>
  new Promise<number>(resolve => {
    const img = new Image()
    img.onload = () => resolve(img.naturalHeight / img.naturalWidth || 1)
    img.onerror = () => resolve(1)
    img.src = src
  })

/**
 * Elements to treat as one solid block of content: custom elements, elements
 * with their own text, and elements with only inline children.
 */
const isLeaf = (el: Element) =>
  el.localName.includes('-') ||
  [...el.childNodes].some(
    node => node.nodeType === Node.TEXT_NODE && node.textContent!.trim()
  ) ||
  [...el.children].every(child =>
    getComputedStyle(child).display.startsWith('inline')
  )

const contentRects = (host: HTMLElement, layer: HTMLElement): Rect[] => {
  const origin = host.getBoundingClientRect()
  const rects: Rect[] = []
  const walk = (el: Element) => {
    if (el === layer) return
    if (!isLeaf(el)) {
      for (const child of el.children) walk(child)
      return
    }
    const r = el.getBoundingClientRect()
    if (r.width && r.height) {
      rects.push({
        x: r.left - origin.left,
        y: r.top - origin.top,
        w: r.width,
        h: r.height
      })
    }
  }
  for (const child of host.children) walk(child)
  return rects
}

const place = (host: HTMLElement, layer: HTMLElement, stickers: Sticker[]) => {
  const { width, height } = host.getBoundingClientRect()
  const blocked = contentRects(host, layer)
  const placed: Rect[] = []
  const size = Math.min(150, Math.max(72, width * 0.07))

  for (const sticker of stickers) {
    const w = size
    const h = size * sticker.ratio
    // Bounding box of the rotated sticker, plus room for its hover lift
    const rad = (Math.abs(sticker.rotate) * Math.PI) / 180
    const bw = (w * Math.cos(rad) + h * Math.sin(rad)) * 1.08
    const bh = (w * Math.sin(rad) + h * Math.cos(rad)) * 1.08

    let spot: Rect | undefined
    for (let i = 0; i < ATTEMPTS && !spot; i++) {
      const candidate = {
        x: random(EDGE, width - bw - EDGE),
        y: random(EDGE, height - bh - EDGE),
        w: bw,
        h: bh
      }
      if (candidate.x < EDGE || candidate.y < EDGE) break // section too small
      const free =
        blocked.every(r => !intersects(candidate, r, GAP_CONTENT)) &&
        placed.every(r => !intersects(candidate, r, GAP_STICKER))
      if (free) spot = candidate
    }

    if (!spot) {
      sticker.el?.remove()
      sticker.el = undefined
      continue
    }
    placed.push(spot)

    if (!sticker.el) {
      const el = document.createElement('hc-sticker')
      el.setAttribute('src', sticker.src)
      el.setAttribute('alt', '')
      el.setAttribute('rotate', String(Math.round(sticker.rotate)))
      el.setAttribute('movable', '')
      sticker.el = el
      layer.append(el)
    }
    // Center the unrotated sticker inside its rotated bounding box
    sticker.el.style.left = `${spot.x + (bw - w) / 2}px`
    sticker.el.style.top = `${spot.y + (bh - h) / 2}px`
    sticker.el.style.setProperty('--hc-sticker-width', `${w}px`)
  }
}

export const scatterStickers = async () => {
  // Measure the final layout: after fonts load and components render
  await Promise.all([
    document.fonts.ready,
    ...['hc-section', 'hc-button', 'hc-email-signup'].map(tag =>
      customElements.whenDefined(tag)
    )
  ])
  const hosts = [...document.querySelectorAll<HTMLElement>('[data-stickers]')]
  const pool = shuffle(STICKERS.filter(src => !HERO.has(src)))

  for (const host of hosts) {
    const count = Number(host.dataset.stickers) || 3
    const srcs = pool.splice(0, count)
    const stickers: Sticker[] = await Promise.all(
      srcs.map(async src => ({
        src,
        ratio: await loadRatio(src),
        rotate: random(8, 22) * (Math.random() < 0.5 ? -1 : 1)
      }))
    )

    const layer = document.createElement('div')
    layer.className = 'sticker-layer'
    layer.setAttribute('aria-hidden', 'true')
    host.prepend(layer)

    let frame = 0
    let lastSize = ''
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const { width, height } = host.getBoundingClientRect()
        const size = `${Math.round(width)}x${Math.round(height)}`
        if (size === lastSize) return
        lastSize = size
        place(host, layer, stickers)
      })
    }
    new ResizeObserver(update).observe(host)
  }
}
