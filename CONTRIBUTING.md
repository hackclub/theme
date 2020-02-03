# Contributing

Hey—thanks for your interest in contributing! We follow the [Hack Club Code of Conduct](https://hackclub.com/conduct/), so please be kind and reach out if you have any questions or concerns.

## Local Development

This repo uses [Yarn Workspaces][] and [Lerna][] to develop multiple packages together as a monorepo.
Be sure to install [Yarn][] before setting up the development environment.

Install dependencies and link local packages in the root directory:

```bash
yarn
```

After yarn has linked packages and installed dependences in the repo, you can run whatever you’re looking for.

```bash
yarn workspace <name-of-package> <command>
```

Where name of package is something like `@hackclub/theme` or `@hackclub/meta` (one of the packages
listed by yarn when you run the `yarn workspaces info` command)

Example:

```bash
yarn workspace @hackclub/meta prepare
```

## Tests

Unit tests are run with [Jest][], and each relevant package includes a `test/` directory with unit tests for that package.

Running tests:

```sh
yarn test
```

Running tests in watch mode:

```sh
yarn test --watch
```

## Pull Requests

When opening a pull request, please be sure to update any relevant documentation.

---

_Doc adapted from [Theme UI][]_

[yarn]: https://yarnpkg.com
[yarn workspaces]: https://yarnpkg.com/en/docs/workspaces
[lerna]: https://github.com/lerna/lerna
[jest]: https://jestjs.io/
[theme ui]: https://github.com/system-ui/theme-ui/blob/master/CONTRIBUTING.md
