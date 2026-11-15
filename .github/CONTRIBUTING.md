# Contributing Guide 

## Issues

- Search the issue tracker before opening an issue.
- Use a clear and descriptive title.
- Include as much information as possible: Steps to reproduce the issue, error message, Node.js version, operating system, etc.
- The more time you put into an issue, the more we will.
- The best issue report is a failing test proving it.

## Pull Request

This repository is a monorepo.
This repository require [pnpm](https://pnpm.io/) for setup.

- [pnpm Installation](https://pnpm.io/installation)

You should run `bootstrap` script before develop it.

```
pnpm install
pnpm run bootstrap
```

### Running Tests

Run tests by following commands:

```
pnpm test
```

## Release flow

This document describe release flow for maintainer.

1. Checkout release branch

```
git checkout -b release-date
git push origin HEAD -u
```

2. Bump version and tag

Run one of following command.

Recommend: `pnpm run versionup`

```
# major update for all
pnpm run versionup:major
# minor update for all
pnpm run versionup:minor
# path update for all
pnpm run versionup:patch
# automatic versioning
pnpm run versionup
```

3. Submit Pull Request

Submit Pull Request and paste the CHANGELOG.

Example: [2018 07 22 release by azu · Pull Request #1 · azu/monorepo-utils](https://github.com/azu/monorepo-utils/pull/1)

**Note**: Reviewers should review it and approve it.

4. Publish to npm

Finally, publish new version to npm

```
# publish to npm
pnpm run release
```

(not `pnpm publish`)


FINISH.
