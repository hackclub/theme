# @hackclub/meta

React component for generating Open Graph/etc meta tags for Hack Club pages.
Designed for Next.js but framework-agnostic.

Not recommended for non-Hack Club sites—you’ll get Hack Club favicons :)

## Usage

```bash
yarn add @hackclub/meta
# npm i @hackclub/meta
```

Example for [hackathons.hackclub.com](https://hackathons.hackclub.com):

```js
// import Head from 'next/head'

<Meta
  as={Head} // component to wrap tags in, defaults to React.Fragment
  name="Hack Club" // site name
  title="Hackathons" // page title
  description="List of upcoming high school hackathons" // page description
  image="https://hackathons.hackclub.com/card.png" // large summary image URL
  color="#ec3750" // theme color
  manifest="/site.webmanifest" // link to site manifest
/>
```

All props are optional. If you include multiple times, the tags from the last
instance will be used.

MIT License
