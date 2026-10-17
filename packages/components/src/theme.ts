/** Color scheme helpers shared by <hc-theme-toggle> and page scripts. */

export type ThemePreference = 'light' | 'dark' | 'system'
export type Theme = 'light' | 'dark'

/** Same key as hackclub.com, so preferences carry over on the same origin. */
export const THEME_STORAGE_KEY = 'hc-site-theme'
export const THEME_CHANGE_EVENT = 'hc-theme-change'

export interface ThemeChangeDetail {
  preference: ThemePreference
  theme: Theme
}

const isBrowser = () => typeof document !== 'undefined'

const systemQuery = () =>
  typeof matchMedia === 'function'
    ? matchMedia('(prefers-color-scheme: dark)')
    : undefined

export const getThemePreference = (): ThemePreference => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {}
  return 'system'
}

export const resolveTheme = (preference: ThemePreference): Theme =>
  preference === 'system'
    ? systemQuery()?.matches
      ? 'dark'
      : 'light'
    : preference

/** Apply a theme to the document without persisting it. */
export const applyTheme = (preference: ThemePreference): Theme => {
  const theme = resolveTheme(preference)
  if (!isBrowser()) return theme
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.dataset.theme = theme
  root.style.colorScheme = theme
  document.dispatchEvent(
    new CustomEvent<ThemeChangeDetail>(THEME_CHANGE_EVENT, {
      detail: { preference, theme }
    })
  )
  return theme
}

/** Persist and apply a theme preference. */
export const setTheme = (preference: ThemePreference): Theme => {
  try {
    if (preference === 'system') localStorage.removeItem(THEME_STORAGE_KEY)
    else localStorage.setItem(THEME_STORAGE_KEY, preference)
  } catch {}
  return applyTheme(preference)
}

let watching = false

/** Re-apply the theme when the OS color scheme changes and the preference is "system". */
export const watchSystemTheme = () => {
  if (watching) return
  const query = systemQuery()
  if (!query) return
  watching = true
  query.addEventListener('change', () => {
    if (getThemePreference() === 'system') applyTheme('system')
  })
}

/**
 * Inline this in `<head>` before any stylesheet to apply the saved theme
 * before first paint (avoids a flash of the wrong color scheme).
 *
 * @example <script>${themeScript}</script>
 */
export const themeScript = `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}'),t=s==='dark'||s==='light'?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'),r=document.documentElement;r.classList.toggle('dark',t==='dark');r.dataset.theme=t;r.style.colorScheme=t}catch(e){}})();`
