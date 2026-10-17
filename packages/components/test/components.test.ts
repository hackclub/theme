import { test, expect, afterEach, describe } from 'bun:test'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import { staticDeclarations, colors, kebab } from '@hackclub/tokens'
import '../src'
import {
  HcIcon,
  registerGlyphs,
  setTheme,
  getThemePreference,
  THEME_STORAGE_KEY,
  themeScript
} from '../src'

const mount = async <T extends HTMLElement>(markup: string): Promise<T> => {
  const host = document.createElement('div')
  host.innerHTML = markup
  document.body.append(host)
  const el = host.firstElementChild as T & { updateComplete?: Promise<unknown> }
  await el.updateComplete
  return el
}

const shadow = (el: Element) => el.shadowRoot!

afterEach(() => {
  document.body.innerHTML = ''
  localStorage.clear()
  document.documentElement.className = ''
  delete document.documentElement.dataset.theme
})

test('every element is registered', () => {
  const tags = [
    'hc-button',
    'hc-card',
    'hc-badge',
    'hc-input',
    'hc-email-signup',
    'hc-heading',
    'hc-kicker',
    'hc-gradient-text',
    'hc-container',
    'hc-section',
    'hc-grid-paper',
    'hc-wave',
    'hc-icon',
    'hc-theme-toggle',
    'hc-polaroid',
    'hc-sticker',
    'hc-nav',
    'hc-nav-menu',
    'hc-footer',
    'hc-footer-column',
    'hc-prose',
    'hc-callout',
    'hc-code'
  ]
  for (const tag of tags) expect(customElements.get(tag), tag).toBeDefined()
})

test('component styles only reference defined tokens', () => {
  const defined = new Set([
    ...staticDeclarations().map(line => line.trim().split(':')[0]),
    ...Object.keys(colors.light).map(k => `--hc-${kebab(k)}`)
  ])
  const dir = join(import.meta.dir, '../src/components')
  for (const file of readdirSync(dir)) {
    const source = readFileSync(join(dir, file), 'utf8')
    // Component-level knobs are declared in the same file
    const local = new Set(
      [...source.matchAll(/(--hc-[a-z0-9-]+):/g)].map(([, name]) => name)
    )
    for (const [, name] of source.matchAll(/var\((--hc-[a-z0-9-]+)/g)) {
      expect(defined.has(name) || local.has(name), `${file} uses ${name}`).toBe(
        true
      )
    }
  }
})

describe('hc-button', () => {
  test('renders a button by default', async () => {
    const el = await mount('<hc-button>Join</hc-button>')
    expect(shadow(el).querySelector('button')).toBeTruthy()
    expect(el.getAttribute('variant')).toBe('primary')
  })

  test('renders a link with href', async () => {
    const el = await mount(
      '<hc-button href="https://hackclub.com" target="_blank" arrow>Go</hc-button>'
    )
    const a = shadow(el).querySelector('a')!
    expect(a.getAttribute('href')).toBe('https://hackclub.com')
    expect(a.getAttribute('rel')).toBe('noopener noreferrer')
    expect(shadow(el).querySelector('.arrow')).toBeTruthy()
  })

  test('submits its form', async () => {
    const form = await mount<HTMLFormElement>(
      '<form><hc-button type="submit">Send</hc-button></form>'
    )
    const button = form.querySelector('hc-button')!
    await button.updateComplete
    let submitted = false
    form.addEventListener('submit', e => {
      e.preventDefault()
      submitted = true
    })
    shadow(button).querySelector('button')!.click()
    expect(submitted).toBe(true)
  })
})

describe('hc-input', () => {
  const hasInternals = 'attachInternals' in HTMLElement.prototype

  test.skipIf(!hasInternals)('contributes its value to FormData', async () => {
    const form = await mount<HTMLFormElement>(
      '<form><hc-input name="club" label="Club" value="Hack Club"></hc-input></form>'
    )
    const input = form.querySelector('hc-input')!
    await input.updateComplete
    expect(new FormData(form).get('club')).toBe('Hack Club')
    expect(shadow(input).querySelector('label')!.textContent).toBe('Club')
  })

  test('shows an error message', async () => {
    const el = await mount(
      '<hc-input label="Email" error="Required"></hc-input>'
    )
    expect(
      shadow(el).querySelector('[role="alert"]')!.textContent!.trim()
    ).toBe('Required')
    expect(
      shadow(el).querySelector('input')!.getAttribute('aria-invalid')
    ).toBe('true')
  })
})

describe('hc-email-signup', () => {
  test('rejects invalid addresses', async () => {
    const el = await mount<HTMLElement & { error?: string }>(
      '<hc-email-signup></hc-email-signup>'
    )
    let fired = false
    el.addEventListener('hc-submit', () => (fired = true))
    shadow(el).querySelector('input')!.value = 'nope'
    shadow(el).querySelector('form')!.requestSubmit()
    expect(fired).toBe(false)
    expect(el.error).toBeTruthy()
  })

  test('fires hc-submit with the email', async () => {
    const el = await mount('<hc-email-signup></hc-email-signup>')
    let email = ''
    el.addEventListener('hc-submit', e => {
      email = (e as CustomEvent).detail.email
    })
    shadow(el).querySelector('input')!.value = ' orpheus@hackclub.com '
    shadow(el).querySelector('form')!.requestSubmit()
    expect(email).toBe('orpheus@hackclub.com')
  })
})

test('hc-heading renders the requested level', async () => {
  const el = await mount('<hc-heading level="3">Hi</hc-heading>')
  const h3 = shadow(el).querySelector('h3')!
  expect(h3).toBeTruthy()
  expect(h3.classList.contains('xl')).toBe(true)
})

describe('hc-icon', () => {
  test('renders bundled glyphs inline', async () => {
    const el = await mount('<hc-icon glyph="github" size="24"></hc-icon>')
    const svg = shadow(el).querySelector('svg')!
    expect(svg.getAttribute('width')).toBe('24')
    expect(svg.getAttribute('aria-hidden')).toBe('true')
    expect(svg.innerHTML).toContain('path')
  })

  test('loads unregistered glyphs from icons.hackclub.com', async () => {
    const el = await mount('<hc-icon glyph="rep" label="Rep"></hc-icon>')
    const mask = shadow(el).querySelector('.mask')!
    expect(mask.getAttribute('style')).toContain(`${HcIcon.cdn}rep.svg`)
    expect(mask.getAttribute('aria-label')).toBe('Rep')
  })

  test('registerGlyphs re-renders existing icons', async () => {
    const el = await mount<HcIcon>('<hc-icon glyph="test-glyph"></hc-icon>')
    registerGlyphs({ 'test-glyph': '<circle cx="16" cy="16" r="8"></circle>' })
    await el.updateComplete
    expect(shadow(el).querySelector('svg circle')).toBeTruthy()
  })
})

describe('theme', () => {
  test('setTheme applies and persists', () => {
    setTheme('dark')
    const root = document.documentElement
    expect(root.classList.contains('dark')).toBe(true)
    expect(root.dataset.theme).toBe('dark')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
    expect(getThemePreference()).toBe('dark')

    setTheme('system')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull()
    expect(getThemePreference()).toBe('system')
  })

  test('themeScript applies the stored theme', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    new Function(themeScript)()
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  test('hc-theme-toggle cycles light → system → dark', async () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'light')
    const el = await mount<HTMLElement & { updateComplete: Promise<unknown> }>(
      '<hc-theme-toggle></hc-theme-toggle>'
    )
    const button = () => shadow(el).querySelector('button')!
    expect(button().getAttribute('aria-label')).toContain('Theme: Light')
    button().click()
    await el.updateComplete
    expect(getThemePreference()).toBe('system')
    button().click()
    await el.updateComplete
    expect(getThemePreference()).toBe('dark')
    expect(button().getAttribute('aria-label')).toContain('Theme: Dark')
  })
})

describe('hc-nav', () => {
  test('renders the logo and toggles the mobile menu', async () => {
    const el = await mount<
      HTMLElement & { open: boolean; updateComplete: Promise<unknown> }
    >(
      `<hc-nav>
        <a href="/clubs">Clubs</a>
        <hc-nav-menu label="About"><a href="/team">Team</a></hc-nav-menu>
      </hc-nav>`
    )
    expect(shadow(el).querySelector('.logo img')!.getAttribute('alt')).toBe(
      'Hack Club'
    )
    const toggle = shadow(el).querySelector<HTMLButtonElement>('.toggle')!
    toggle.click()
    await el.updateComplete
    expect(el.open).toBe(true)
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
  })

  test('hc-nav-menu opens on click and closes on Escape', async () => {
    const el = await mount<
      HTMLElement & { open: boolean; updateComplete: Promise<unknown> }
    >('<hc-nav-menu label="About"><a href="/team">Team</a></hc-nav-menu>')
    const trigger = shadow(el).querySelector<HTMLButtonElement>('.trigger')!
    trigger.click()
    await el.updateComplete
    expect(el.open).toBe(true)
    el.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    )
    await el.updateComplete
    expect(el.open).toBe(false)
  })
})

test('hc-footer renders Hack Club defaults', async () => {
  const el = await mount(
    `<hc-footer><hc-footer-column heading="Resources"><a href="/clubs">Clubs</a></hc-footer-column></hc-footer>`
  )
  const root = shadow(el)
  expect(root.querySelectorAll('.social a').length).toBe(4)
  expect(root.querySelector('.legal')!.textContent).toContain('Hack Club')
  expect(root.querySelector('hc-theme-toggle')).toBeTruthy()
})

test('hc-prose adds its stylesheet once', async () => {
  await mount('<hc-prose><h2>Title</h2></hc-prose>')
  await mount('<hc-prose><p>Body</p></hc-prose>')
  const viaStyle = document.querySelectorAll('style[data-hc-prose]').length
  const viaAdopted = document.adoptedStyleSheets?.length ?? 0
  expect(viaStyle + viaAdopted).toBe(1)
})

test('hc-code dedents its text', async () => {
  const el = await mount<HTMLElement & { code: string }>(
    `<hc-code>
      bun add @hackclub/theme
        indented
    </hc-code>`
  )
  expect(el.code).toBe('bun add @hackclub/theme\n  indented')
  expect(shadow(el).querySelector('pre')!.textContent).toBe(el.code)
})

test('hc-callout picks an icon per tone', async () => {
  const el = await mount(
    '<hc-callout tone="tip" heading="Pro tip">Hi</hc-callout>'
  )
  expect(shadow(el).querySelector('hc-icon')!.getAttribute('glyph')).toBe(
    'idea'
  )
  expect(shadow(el).querySelector('.heading')!.textContent).toBe('Pro tip')
})
