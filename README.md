# monorepo-utils

This repository is utilities for monorepo.
Also this repository is a monorepo.

## packages

### [@monorepo-utils/publish](./packages/@monorepo-utils/publish)

[@monorepo-utils/publish](./packages/@monorepo-utils/publish) help npm publish.

This script split `lerna publish` into tagging and publishing.

### [@monorepo-utils/collect-changelog](./packages/@monorepo-utils/collect-changelog)

[@monorepo-utils/collect-changelog](./packages/@monorepo-utils/collect-changelog) get change from each package's `CHANGELOG.md`.
It help to collect changelog in lerna's [Independent mode](https://github.com/lerna/lerna#independent-mode---independent).
