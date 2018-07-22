# monorepo-utils [![Build Status](https://travis-ci.org/azu/monorepo-utils.svg?branch=master)](https://travis-ci.org/azu/monorepo-utils)

This repository is utilities for monorepo.
Also this repository is a monorepo.

## packages

### [@monorepo-utils/publish](./packages/@monorepo-utils/publish)

[@monorepo-utils/publish](./packages/@monorepo-utils/publish) help npm publish.

This script split `lerna publish` into tagging and publishing.

### [@monorepo-utils/collect-changelog](./packages/@monorepo-utils/collect-changelog)

[@monorepo-utils/collect-changelog](./packages/@monorepo-utils/collect-changelog) get change from each package's `CHANGELOG.md`.
It help to collect changelog in lerna's [Independent mode](https://github.com/lerna/lerna#independent-mode---independent).


## UseCase

These utils aim to make release flow more flexible.

:memo: Sidenote: [lerna publish](https://github.com/lerna/lerna/blob/master/commands/publish#readme) do all things at once.

You can do release to use [@monorepo-utils/publish](./packages/@monorepo-utils/publish) and [@monorepo-utils/collect-changelog](./packages/@monorepo-utils/collect-changelog) by following steps: 

1. Bump version and generate CHANGELOG
2. Submit Pull Request
3. Review the CHANGELOG
4. Publish to npm
5. Merge

For more details, see [Release flow](https://github.com/azu/monorepo-utils/blob/master/.github/CONTRIBUTING.md#release-flow) on this repository.
