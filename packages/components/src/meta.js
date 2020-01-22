import React from 'react'
import { theme } from '@hackclub/theme'

const makeTitle = (title, name) =>
  title === name ? title : `${title} – ${name}`

const Meta = ({
  name = 'Hack Club',
  title = 'Hack Club',
  description,
  image,
  color = theme.colors.red,
  manifest = false
}) => (
  <React.Fragment>
    <meta key="og_type" property="og:type" content="website" />
    <meta key="og_site" property="og:site_name" content={name} />
    <meta key="tw_site" name="twitter:site" content="@hackclub" />

    <title>{makeTitle(title, name)}</title>
    <meta key="og_title" property="og:title" content={makeTitle(title, name)} />
    <meta
      key="tw_title"
      name="twitter:title"
      content={makeTitle(title, name)}
    />

    {description && (
      <React.Fragment>
        <meta key="desc" name="description" content={description} />
        <meta key="og_desc" property="og:description" content={description} />
        <meta key="tw_desc" name="twitter:description" content={description} />
      </React.Fragment>
    )}

    {image && (
      <React.Fragment>
        <meta key="og_img" property="og:image" content={image} />
        <meta key="tw_card" name="twitter:card" content="summary_large_image" />
        <meta key="tw_img" name="twitter:image" content={image} />
      </React.Fragment>
    )}

    <meta key="theme_color" name="theme-color" content={color} />
    <meta key="tile_color" name="msapplication-TileColor" content={color} />

    <link
      key="safari_icon"
      rel="mask-icon"
      href="https://hackclub.com/safari-pinned-tab.svg"
      color={color}
    />
    <link
      key="apple_icon"
      rel="apple-touch-icon"
      sizes="180x180"
      href="https://hackclub.com/apple-touch-icon.png"
    />
    <link
      key="favicon_32"
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="https://hackclub.com/favicon-32x32.png"
    />
    <link
      key="favicon_16"
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="https://hackclub.com/favicon-16x16.png"
    />

    {manifest && <link key="manifest" rel="manifest" href={manifest} />}
  </React.Fragment>
)

export default Meta
