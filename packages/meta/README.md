# @doctordatadata/meta

React component for generating Open Graph/etc meta tags for BioX pages.
Designed for Next.js but framework-agnostic.

## Usage

```bash
yarn add @doctordatadata/meta
# npm i @doctordatadata/meta
```

Example usage:

```js
// import Head from 'next/head'

<Meta
  as={Head} // component to wrap tags in, defaults to React.Fragment
  name="BioX" // site name
  title="Dashboard" // page title
  description="Your project description" // page description
  image="https://example.com/card.png" // large summary image URL
  color="#ec3750" // theme color
  manifest="/site.webmanifest" // link to site manifest
/>
```

All props are optional. If you include multiple times, the tags from the last
instance will be used.

MIT License
