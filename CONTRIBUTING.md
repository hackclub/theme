# Contributing

Hey—thanks for your interest in contributing! We follow the [Hack Club Code of Conduct](https://hackclub.com/conduct/), so please be kind and reach out if you have any questions or concerns.

## Local Development

This repo is a [Bun](https://bun.sh) workspace, with [Lerna][] building the
packages in dependency order.

```bash
bun install           # installs dependencies and builds every package
bun run build         # rebuild after changing a package
bun run --cwd docs dev
```

## Tests

Unit tests use `bun test` with [happy-dom](https://github.com/capricorn86/happy-dom),
and live in each package's `test/` directory.

```sh
bun run test
bun run test:e2e   # clean build + tests + dist smoke test + docs build
```

## Pull Requests

When opening a pull request, please be sure to update any relevant documentation.

---

_Doc adapted from [Theme UI][]_

[lerna]: https://github.com/lerna/lerna
[theme ui]: https://github.com/system-ui/theme-ui/blob/master/CONTRIBUTING.md
