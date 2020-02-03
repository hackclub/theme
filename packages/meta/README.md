# @hackclub/meta

React component for generating Open Graph/etc meta tags for Hack Club pages.

## Usage

```bash
yarn add @hackclub/meta
# npm i @hackclub/meta
```

Example for [hackathons.hackclub.com](https://hackathons.hackclub.com):

```js
<Meta
  name="Hack Club" // site name
  title="Hackathons" // page title
  description="List of upcoming high school hackathons" // page description
  image="https://hackathons.hackclub.com/card.png" // large summary image URL
  color="#ec3750" // theme color
  manifest="/site.webmanifest" // link to site manifest
/>
```

All props are optional.

MIT License
