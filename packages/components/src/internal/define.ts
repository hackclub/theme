import { toCSS } from '@hackclub/tokens'

let tokensChecked = false

/**
 * Inject the token stylesheet if the page hasn't loaded it, so components
 * look right even when only the JavaScript is included.
 */
const ensureTokens = () => {
  if (tokensChecked || typeof document === 'undefined') return
  tokensChecked = true
  const root = document.documentElement
  if (getComputedStyle(root).getPropertyValue('--hc-red').trim()) return
  if (document.querySelector('style[data-hc-tokens]')) return
  const style = document.createElement('style')
  style.dataset.hcTokens = ''
  style.textContent = toCSS()
  document.head.prepend(style)
}

/** Register a custom element once, even if the module is loaded twice. */
export const define = (tag: string, ctor: CustomElementConstructor) => {
  if (typeof customElements === 'undefined') return
  ensureTokens()
  if (!customElements.get(tag)) customElements.define(tag, ctor)
}
