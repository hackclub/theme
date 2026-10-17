export interface Demo {
  title?: string
  html: string
  /** Stage layout: inline items (default), a block, or edge to edge */
  layout?: 'inline' | 'block' | 'flush'
}

export type Row = [
  name: string,
  description: string,
  type?: string,
  defaultValue?: string
]

export interface ComponentDoc {
  slug: string
  name: string
  group: 'Core' | 'Site chrome' | 'Motifs' | 'Content'
  tags: string[]
  summary: string
  demos: Demo[]
  attributes?: Row[]
  slots?: Row[]
  events?: Row[]
  parts?: Row[]
  cssProps?: Row[]
  notes?: string
}

const photo = (n: number) => `https://hackclub.com/assets/hero_photo${n}.webp`
const sticker = (n: number) =>
  `https://hackclub.com/assets/hero_sticker${n}.webp`

export const components: ComponentDoc[] = [
  {
    slug: 'button',
    name: 'Button',
    group: 'Core',
    tags: ['hc-button'],
    summary:
      'The pill-shaped button from hackclub.com. Dark by default, turning red on hover. Set `href` to render a link, and `arrow` for the arrow that nudges on hover. Inside a `<form>` it submits like a native button.',
    demos: [
      {
        title: 'Variants',
        html: `<hc-button arrow>Join the community</hc-button>
<hc-button variant="red">Start a club</hc-button>
<hc-button variant="secondary">Learn more</hc-button>
<hc-button variant="outline">Donate</hc-button>
<hc-button variant="ghost">Cancel</hc-button>`
      },
      {
        title: 'Sizes, icons and links',
        html: `<hc-button size="sm">Small</hc-button>
<hc-button>Medium</hc-button>
<hc-button size="lg" arrow>Large</hc-button>
<hc-button href="https://github.com/hackclub" target="_blank" variant="secondary">
  <hc-icon slot="start" glyph="github" size="24"></hc-icon>
  GitHub
</hc-button>
<hc-button disabled>Disabled</hc-button>`
      }
    ],
    attributes: [
      [
        'variant',
        'Visual style',
        '"primary" | "red" | "secondary" | "outline" | "ghost"',
        '"primary"'
      ],
      ['size', 'Height and padding', '"sm" | "md" | "lg"', '"md"'],
      ['href', 'Renders an `<a>` instead of a `<button>`', 'string'],
      [
        'target, rel, download',
        'Passed to the link. `rel` defaults to `noopener noreferrer` for `_blank`',
        'string'
      ],
      ['type', 'Form behavior', '"submit" | "reset" | "button"', '"submit"'],
      ['arrow', 'Show the trailing arrow', 'boolean', 'false'],
      ['disabled', 'Disable the button', 'boolean', 'false']
    ],
    slots: [
      ['(default)', 'Label'],
      ['start', 'Before the label, e.g. an `<hc-icon>`'],
      ['end', 'After the label; replaces the arrow']
    ],
    parts: [
      ['control', 'The inner `<a>` or `<button>`'],
      ['arrow', 'The arrow wrapper']
    ],
    cssProps: [
      ['--hc-button-bg / --hc-button-fg', 'Resting colors'],
      ['--hc-button-bg-hover / --hc-button-fg-hover', 'Hover colors'],
      [
        '--hc-button-height, --hc-button-padding, --hc-button-font-size',
        'Sizing'
      ]
    ]
  },
  {
    slug: 'card',
    name: 'Card',
    group: 'Core',
    tags: ['hc-card'],
    summary:
      'Rounded content cards. `surface` is the default 16px-radius card; `raised` is the bordered, warm-shadowed card from the brand page; `image` puts text over a darkened photo. Set `href` to make the whole card a link.',
    demos: [
      {
        layout: 'block',
        html: `<div class="grid">
  <hc-card>
    <h3 class="card-title">Surface</h3>
    <p class="card-text">The everyday card, on the surface color.</p>
  </hc-card>
  <hc-card variant="raised">
    <h3 class="card-title">Raised</h3>
    <p class="card-text">Bordered, with a soft warm shadow.</p>
  </hc-card>
  <hc-card variant="image" image="${photo(2)}" href="#">
    <h3 class="card-title">Image</h3>
    <p>Text over a photo. This one is a link.</p>
  </hc-card>
  <hc-card variant="outline" interactive>
    <img slot="media" src="${photo(3)}" alt="" height="160" />
    <h3 class="card-title">With media</h3>
    <p class="card-text">Media slot, lifts on hover.</p>
    <hc-button slot="footer" size="sm" variant="secondary">Open</hc-button>
  </hc-card>
</div>`
      }
    ],
    attributes: [
      [
        'variant',
        'Visual style',
        '"surface" | "raised" | "outline" | "image" | "ink"',
        '"surface"'
      ],
      ['href, target', 'Make the whole card a link', 'string'],
      ['image', 'Background image for the `image` variant', 'string'],
      [
        'interactive',
        'Lift on hover (automatic with `href`)',
        'boolean',
        'false'
      ]
    ],
    slots: [
      ['(default)', 'Body'],
      ['media', 'Full-bleed content above the body'],
      ['footer', 'Pinned to the bottom']
    ],
    parts: [
      ['card', 'The card'],
      ['body', 'Padded body'],
      ['footer', 'Footer wrapper']
    ],
    cssProps: [['--hc-card-padding', 'Body padding']]
  },
  {
    slug: 'badge',
    name: 'Badge',
    group: 'Core',
    tags: ['hc-badge'],
    summary:
      'Small pill labels in any brand color, with an optional pulsing “live” dot.',
    demos: [
      {
        html: `<hc-badge>New</hc-badge>
<hc-badge color="orange">Beta</hc-badge>
<hc-badge color="yellow">Featured</hc-badge>
<hc-badge color="green">Open</hc-badge>
<hc-badge color="cyan">Online</hc-badge>
<hc-badge color="blue">Event</hc-badge>
<hc-badge color="purple">Hackathon</hc-badge>
<hc-badge color="muted">Archived</hc-badge>
<hc-badge color="ink">Ink</hc-badge>`
      },
      {
        title: 'Soft, outline and live',
        html: `<hc-badge variant="soft">Soft</hc-badge>
<hc-badge variant="soft" color="blue">Soft blue</hc-badge>
<hc-badge variant="outline" color="purple">Outline</hc-badge>
<hc-badge pulse>Live now</hc-badge>`
      }
    ],
    attributes: [
      [
        'color',
        'Brand color',
        '"red" | "orange" | "yellow" | "green" | "cyan" | "blue" | "purple" | "muted" | "ink"',
        '"red"'
      ],
      ['variant', 'Fill style', '"solid" | "soft" | "outline"', '"solid"'],
      ['pulse', 'Show a pulsing dot', 'boolean', 'false']
    ],
    parts: [['badge', 'The pill']]
  },
  {
    slug: 'input',
    name: 'Input',
    group: 'Core',
    tags: ['hc-input'],
    summary:
      'A pill text field with a label, hint and error message. It is form-associated: its value is submitted with the surrounding `<form>` and it takes part in native validation.',
    demos: [
      {
        layout: 'block',
        html: `<form style="display: grid; gap: 24px; max-width: 420px">
  <hc-input label="Club name" name="club" placeholder="Hack Club @ Shelburne" hint="You can change this later." required></hc-input>
  <hc-input label="Website" name="url" type="url" error="That doesn’t look like a URL" value="hackclub"></hc-input>
  <hc-button type="submit" arrow>Create club</hc-button>
</form>`
      }
    ],
    attributes: [
      ['label', 'Visible label', 'string'],
      ['hide-label', 'Keep the label for screen readers only', 'boolean'],
      ['name, value, type, placeholder', 'Same as `<input>`', 'string'],
      [
        'autocomplete, inputmode, pattern, minlength, maxlength',
        'Same as `<input>`'
      ],
      ['hint', 'Help text below the field', 'string'],
      ['error', 'Error message; marks the field invalid', 'string'],
      ['required, disabled, readonly', 'Same as `<input>`', 'boolean']
    ],
    events: [
      ['input', 'Every keystroke'],
      ['change', 'When the value is committed']
    ],
    parts: [
      ['label', ''],
      ['input', ''],
      ['hint', ''],
      ['error', '']
    ]
  },
  {
    slug: 'email-signup',
    name: 'Email signup',
    group: 'Core',
    tags: ['hc-email-signup'],
    summary:
      'The homepage email capture: a pill input with a “Join” button inside it, client-side validation and an error tooltip. Without an `action` it fires `hc-submit` and leaves the request to you; set `status="success"` when you are done.',
    demos: [
      {
        layout: 'block',
        html: `<hc-email-signup id="signup"></hc-email-signup>
<script type="module">
  const signup = document.getElementById('signup')
  signup.addEventListener('hc-submit', async () => {
    signup.status = 'loading'
    await new Promise(resolve => setTimeout(resolve, 800))
    signup.status = 'success'
  })
</script>`
      }
    ],
    attributes: [
      [
        'action, method',
        'Submit natively to this URL (unless `hc-submit` is canceled)',
        'string',
        'method: "post"'
      ],
      ['name', 'Field name', 'string', '"email"'],
      ['placeholder', '', 'string', '"orpheus@hackclub.com"'],
      ['label', 'Accessible label', 'string', '"Email address"'],
      ['button-label', '', 'string', '"Join"'],
      [
        'invalid-message, success-message',
        'Copy for the error and success states',
        'string'
      ],
      ['status', 'Request state', '"idle" | "loading" | "success"', '"idle"'],
      ['error', 'Show an error tooltip, e.g. after a failed request', 'string']
    ],
    events: [['hc-submit', 'Cancelable. `detail: { email }`']],
    parts: [
      ['form', ''],
      ['input', ''],
      ['button', ''],
      ['error', ''],
      ['success', '']
    ]
  },
  {
    slug: 'typography',
    name: 'Heading, kicker & gradient text',
    group: 'Core',
    tags: ['hc-heading', 'hc-kicker', 'hc-gradient-text'],
    summary:
      'Headings are set in Zarathustra, the serif display face of hackclub.com, over Phantom Sans body text. `<hc-kicker>` is the tracked-out label above section titles, and `<hc-gradient-text>` fills text with the red→orange brand gradient or the animated rainbow from the homepage hero. If you prefer classes, `.hc-display`, `.hc-title`, `.hc-heading`, `.hc-kicker`, `.hc-lead` and `.hc-gradient-text` come with the CSS.',
    demos: [
      {
        layout: 'block',
        html: `<hc-kicker>Hack Club</hc-kicker>
<hc-heading level="1" size="display">
  A home for <hc-gradient-text variant="rainbow">teen</hc-gradient-text> hackers
</hc-heading>
<hc-heading level="2">Build something <hc-gradient-text>awesome</hc-gradient-text></hc-heading>
<hc-heading level="3">Section heading</hc-heading>
<p class="hc-lead">Lead paragraphs use the muted text color at 24px.</p>`
      }
    ],
    attributes: [
      ['hc-heading level', 'Heading level, 1–6', 'number', '2'],
      [
        'hc-heading size',
        'Visual size, independent of level',
        '"display" | "title" | "heading" | "xl" | "lg" | "body"',
        'by level'
      ],
      ['hc-kicker color', '', '"red" | "muted" | "inherit"', '"red"'],
      [
        'hc-gradient-text variant',
        '',
        '"brand" | "deep" | "rainbow"',
        '"brand"'
      ],
      [
        'hc-gradient-text still',
        'Stop the rainbow animation',
        'boolean',
        'false'
      ]
    ],
    parts: [['heading', 'The `<h1>`–`<h6>` inside `<hc-heading>`']]
  },
  {
    slug: 'layout',
    name: 'Container & section',
    group: 'Core',
    tags: ['hc-container', 'hc-section'],
    summary:
      '`<hc-section>` gives full-width bands generous vertical padding and centers their content at 1200px. Tones: `surface`, `ink` (always dark), `wash` (the red hero wash) and `grid` (grid paper). `<hc-container>` centers content on its own; `size="prose"` narrows it to 800px.',
    demos: [
      {
        layout: 'flush',
        html: `<hc-section tone="wash" compact>
  <hc-kicker>Wash</hc-kicker>
  <hc-heading>Sections center their content</hc-heading>
</hc-section>
<hc-section tone="ink" compact>
  <hc-kicker>Ink</hc-kicker>
  <hc-heading>Always dark, in either theme</hc-heading>
</hc-section>
<hc-section tone="grid" compact>
  <hc-container size="prose">
    <hc-kicker>Grid</hc-kicker>
    <hc-heading>Grid paper, with a prose-width container</hc-heading>
  </hc-container>
</hc-section>`
      }
    ],
    attributes: [
      [
        'hc-section tone',
        '',
        '"default" | "surface" | "ink" | "wash" | "grid"',
        '"default"'
      ],
      ['hc-section compact', 'Halve the vertical padding', 'boolean'],
      ['hc-section bleed', 'Don’t constrain content width', 'boolean'],
      ['hc-container size', '', '"default" | "prose" | "full"', '"default"']
    ],
    parts: [['inner', 'The centered wrapper inside `<hc-section>`']]
  },
  {
    slug: 'icon',
    name: 'Icon',
    group: 'Core',
    tags: ['hc-icon'],
    summary:
      'All 497 glyphs from [icons.hackclub.com](https://icons.hackclub.com). Icons take the current text color. Only the few glyphs the components use are bundled; anything else loads from icons.hackclub.com as a CSS mask. To embed every glyph (for offline use or a strict CSP), `import "@hackclub/components/icons"`.',
    demos: [
      {
        html: `<hc-icon glyph="github"></hc-icon>
<hc-icon glyph="slack" style="color: var(--hc-purple)"></hc-icon>
<hc-icon glyph="code" style="color: var(--hc-blue)"></hc-icon>
<hc-icon glyph="rep" style="color: var(--hc-red)" size="48"></hc-icon>
<hc-icon glyph="flag" style="color: var(--hc-orange)" size="48"></hc-icon>
<hc-icon glyph="emoji" size="64" label="Smiley"></hc-icon>`
      }
    ],
    attributes: [
      ['glyph', 'Icon name from icons.hackclub.com', 'GlyphName', '"like"'],
      ['size', 'Width and height in px', 'number', '32'],
      ['label', 'Accessible name; omit for decorative icons', 'string']
    ],
    parts: [['svg', 'The `<svg>` (or mask `<span>`)']],
    notes:
      'Call `registerGlyphs({ name: "<path …/>" })` to add your own glyphs, and set `HcIcon.cdn` to load unregistered glyphs from somewhere else.'
  },
  {
    slug: 'nav',
    name: 'Navigation',
    group: 'Site chrome',
    tags: ['hc-nav', 'hc-nav-menu'],
    summary:
      'The hackclub.com header, with the flag logo, links, dropdown menus and a call to action. Below 1024px it collapses behind a hamburger into a full-screen menu, and dropdowns become inline disclosures. `sticky` pins it with a frosted background once the page scrolls; `invert` uses light text over dark heroes. This site’s header is a live example: resize the window to see the mobile menu.',
    demos: [
      {
        layout: 'flush',
        html: `<hc-nav>
  <a href="#" aria-current="page">Clubs</a>
  <a href="#">Hackathons</a>
  <hc-nav-menu label="About">
    <a href="#">Philosophy</a>
    <a href="#">Our team</a>
    <a href="#">Jobs</a>
  </hc-nav-menu>
  <hc-button slot="cta" size="sm" variant="primary">Join community</hc-button>
</hc-nav>`
      }
    ],
    attributes: [
      [
        'logo-src, logo-alt, logo-href',
        'The logo image and link',
        'string',
        'Hack Club flag, "/"'
      ],
      ['label', 'Accessible name of the `<nav>`', 'string', '"Main"'],
      [
        'sticky',
        'Stick to the top with a frosted background once scrolled',
        'boolean'
      ],
      ['invert', 'Light text until scrolled, for dark heroes', 'boolean'],
      ['open', 'Mobile menu state', 'boolean'],
      ['hc-nav-menu label', 'Dropdown trigger text', 'string'],
      [
        'hc-nav-menu align',
        'Align the panel to the trigger’s start or end',
        '"start" | "end"',
        '"start"'
      ]
    ],
    slots: [
      ['(default)', 'Links and `<hc-nav-menu>` elements'],
      ['logo', 'Replace the logo'],
      ['cta', 'Call to action'],
      ['end', 'Extra controls, e.g. `<hc-theme-toggle>`']
    ],
    events: [['hc-toggle', 'The mobile menu opened or closed']],
    parts: [
      ['bar', ''],
      ['logo', ''],
      ['menu', ''],
      ['toggle', 'Hamburger button']
    ]
  },
  {
    slug: 'footer',
    name: 'Footer',
    group: 'Site chrome',
    tags: ['hc-footer', 'hc-footer-column'],
    summary:
      'The always-dark grid-paper footer. Every slot comes with Hack Club defaults: the logo, “For teens, by teens.”, social links, the copyright line and a theme toggle. To remove a default, pass an empty element to its slot. An optional illustration can peek over the top edge.',
    demos: [
      {
        layout: 'flush',
        html: `<hc-footer>
  <hc-footer-column heading="Hack Club">
    <a href="#">Philosophy</a>
    <a href="#">Team &amp; board</a>
    <a href="#">Brand guide</a>
  </hc-footer-column>
  <hc-footer-column heading="Resources">
    <a href="#">Clubs</a>
    <a href="#">Hackathons</a>
    <a href="#">HCB</a>
  </hc-footer-column>
</hc-footer>`
      }
    ],
    attributes: [['logo-href', 'Where the logo links', 'string', '"/"']],
    slots: [
      [
        '(default)',
        '`<hc-footer-column heading="…">` elements containing links'
      ],
      ['logo', 'Replace the flag'],
      ['about', 'Text under the logo'],
      ['social', 'Replace the social icons'],
      ['legal', 'Replace the copyright line'],
      ['end', 'Bottom-right controls (default: a theme toggle)'],
      ['art', 'An illustration overlapping the top edge']
    ],
    parts: [['footer', 'The `<footer>` element']]
  },
  {
    slug: 'theme-toggle',
    name: 'Theme toggle',
    group: 'Site chrome',
    tags: ['hc-theme-toggle'],
    summary:
      'Cycles light → system → dark, saves the choice in `localStorage` (key `hc-site-theme`, as on hackclub.com) and keeps every toggle on the page in sync. To avoid a flash of the wrong theme, inline `themeScript` in your `<head>`.',
    demos: [
      {
        html: `<hc-theme-toggle></hc-theme-toggle>
<hc-theme-toggle variant="labeled"></hc-theme-toggle>`
      }
    ],
    attributes: [['variant', '', '"icon" | "labeled"', '"icon"']],
    parts: [['button', '']],
    notes:
      'The JS helpers `setTheme()`, `getThemePreference()`, `applyTheme()` and the `hc-theme-change` event are exported for custom controls.'
  },
  {
    slug: 'photos',
    name: 'Polaroid & sticker',
    group: 'Motifs',
    tags: ['hc-polaroid', 'hc-sticker'],
    summary:
      'The tilted, white-bordered photos and die-cut stickers scattered around the hackclub.com hero. Polaroids straighten on hover. Visitors can drag `movable` stickers around, or move them with the arrow keys once focused.',
    demos: [
      {
        html: `<hc-polaroid src="${photo(1)}" alt="Teenagers at a hackathon" rotate="-6"></hc-polaroid>
<hc-polaroid src="${photo(2)}" alt="A club meeting" rotate="4" caption="Club night"></hc-polaroid>
<hc-sticker src="${sticker(1)}" alt="Hack Club sticker" rotate="-8" movable></hc-sticker>
<hc-sticker src="${sticker(3)}" alt="Orpheus sticker" rotate="10" movable></hc-sticker>`
      }
    ],
    attributes: [
      ['src, alt', 'Image', 'string'],
      ['rotate', 'Tilt in degrees', 'number', 'polaroid -4, sticker 6'],
      ['hc-polaroid caption', 'Caption under the photo', 'string'],
      ['hc-sticker movable', 'Allow dragging', 'boolean']
    ],
    slots: [['caption', 'Rich caption for `<hc-polaroid>`']],
    events: [['hc-move', '`<hc-sticker>` was dropped. `detail: { x, y }`']],
    cssProps: [
      ['--hc-polaroid-width / --hc-sticker-width', 'Width (240px / 120px)']
    ]
  },
  {
    slug: 'decor',
    name: 'Wave & grid paper',
    group: 'Motifs',
    tags: ['hc-wave', 'hc-grid-paper'],
    summary:
      'Wavy section dividers and grid-paper backgrounds. Give a wave the color of the section it leads into (`fill`), and `flip` it at the top edge of a section.',
    demos: [
      {
        layout: 'flush',
        html: `<hc-grid-paper size="32" style="padding: 48px 32px 0">
  <hc-heading level="3" size="xl">Grid paper, 32px</hc-heading>
</hc-grid-paper>
<div style="background: var(--hc-surface)">
  <hc-wave fill="var(--hc-ink)" line></hc-wave>
  <div style="background: var(--hc-ink); color: var(--hc-cream); padding: 32px">Next section</div>
</div>`
      }
    ],
    attributes: [
      ['hc-wave fill', 'Fill color', 'CSS color', 'var(--hc-background)'],
      ['hc-wave flip', 'Point downward', 'boolean'],
      ['hc-wave line', 'Stroke the crest', 'boolean'],
      ['hc-grid-paper size', 'Cell size in px', 'number', '50']
    ],
    cssProps: [
      ['--hc-grid-size, --hc-grid-color', 'Grid paper cell size and line color']
    ]
  },
  {
    slug: 'prose',
    name: 'Prose',
    group: 'Content',
    tags: ['hc-prose'],
    summary:
      'Styles long-form HTML, such as rendered Markdown, like the text pages on hackclub.com. Content stays in the light DOM, so any nested markup is styled. You can also use the `.hc-prose` class.',
    demos: [
      {
        layout: 'block',
        html: `<hc-prose>
  <h2>Code of conduct</h2>
  <p>Hack Club is a <a href="#">community of teenagers</a> who love to make things. Here’s what we expect:</p>
  <ul>
    <li>Be kind and welcoming</li>
    <li>Share what you <strong>build</strong></li>
  </ul>
  <blockquote>Blockquotes get a red rule and muted italics.</blockquote>
  <p>Run <code>bun add @hackclub/theme</code> to get started.</p>
</hc-prose>`
      }
    ]
  },
  {
    slug: 'callout',
    name: 'Callout',
    group: 'Content',
    tags: ['hc-callout'],
    summary: 'Highlighted asides for notes, tips and warnings.',
    demos: [
      {
        layout: 'block',
        html: `<hc-callout heading="Note">Clubs meet weekly during the school year.</hc-callout>
<hc-callout tone="tip" heading="Tip">Ask your club leader for a sticker pack.</hc-callout>
<hc-callout tone="warning">Applications close Friday.</hc-callout>
<hc-callout tone="danger" heading="Heads up">Never share your HCB login.</hc-callout>`
      }
    ],
    attributes: [
      ['tone', '', '"note" | "tip" | "warning" | "danger"', '"note"'],
      ['heading', 'Bold heading', 'string']
    ],
    slots: [
      ['(default)', 'Body'],
      ['heading', 'Rich heading']
    ],
    parts: [['callout', '']]
  },
  {
    slug: 'code',
    name: 'Code block',
    group: 'Content',
    tags: ['hc-code'],
    summary:
      'A code block with an optional file name and a copy button. Common indentation is removed. Write the code as text content, escaping `<` as `&lt;`.',
    demos: [
      {
        layout: 'block',
        html: `<hc-code filename="index.html">
  &lt;link rel="stylesheet" href="https://unpkg.com/@hackclub/theme@2/dist/hackclub.css" /&gt;
  &lt;script type="module" src="https://unpkg.com/@hackclub/theme@2/dist/hackclub.js"&gt;&lt;/script&gt;
</hc-code>`
      }
    ],
    attributes: [
      ['filename', 'Header label', 'string'],
      ['language', 'Informational; no highlighting is applied', 'string'],
      ['nocopy', 'Hide the copy button', 'boolean']
    ],
    parts: [
      ['pre', ''],
      ['copy', 'Copy button']
    ]
  }
]

export const groups = ['Core', 'Site chrome', 'Motifs', 'Content'] as const
