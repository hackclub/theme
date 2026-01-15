# BioX Theme

![format](https://github.com/dr-data/biox-theme/workflows/format/badge.svg)
![test](https://github.com/dr-data/biox-theme/workflows/test/badge.svg)

BioX's frontend design system/tools, made for [Theme UI](https://theme-ui.com).

## Package

`@bio-x/theme` – Theme UI base theme with default and retro themes

## Documentation Site

The documentation and demo site has been **moved to a separate repository** for independent deployment:

**Repository:** [biox-theme-doc](https://github.com/dr-data/biox-theme-doc) (private)

**Live Site:** https://docs.biox-theme.com (or your Vercel URL)

### Local Documentation Development

To work on documentation locally:

```bash
# 1. Ensure main monorepo is built
cd biox-theme
yarn install
yarn prepare

# 2. Clone docs repo (sibling directory recommended)
cd ..
git clone https://github.com/dr-data/biox-theme-doc.git

# 3. Install docs dependencies (will link to local packages)
cd biox-theme-doc
yarn install

# 4. Start docs development server
yarn dev
```

**Note:** Documentation imports theme packages from local file paths for live development. Both repositories must be cloned side-by-side for local documentation work.

### Migration to NPM Packages (Future)

When ready to decouple documentation from monorepo:
1. Ensure stable package versions are published to npm
2. Update docs `package.json` to use versioned npm packages
3. Simplify setup to single repository clone

## Quick Start

```bash
yarn add @bio-x/theme
```

## Development

```bash
yarn install
yarn prepare
yarn test
```

## Publishing

Run the publish script:

```bash
./publish.sh
```

MIT License
