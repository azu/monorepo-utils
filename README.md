# monorepo-utils [![Actions Status: test](https://github.com/azu/monorepo-utils/workflows/test/badge.svg)](https://github.com/azu/monorepo-utils/actions?query=workflow%3A"test")

This repository is utilities for monorepo.
Also, this repository is a monorepo.

## Packages

### [@monorepo-utils/package-utils](./packages/@monorepo-utils/package-utils)

Collect package file path in the monorepo.

Supports following package manager's workspaces.

- Lerna(`lerna.json`)
- Yarn's workspaces
- npm v7+'s workspaces

### [@monorepo-utils/workspaces-to-typescript-project-references](./packages/@monorepo-utils/workspaces-to-typescript-project-references)

This tool convert `lerna.json`/npm workspaces/yarn workspaces to [TypeScript's Project References](https://www.typescriptlang.org/docs/handbook/project-references.html).

This tool allows you to update `tsconfig.json`'s `references` property and test it. 

### [@monorepo-utils/collect-changelog](./packages/@monorepo-utils/collect-changelog)

[@monorepo-utils/collect-changelog](./packages/@monorepo-utils/collect-changelog) get change from each package's `CHANGELOG.md`.
It help to collect changelog in lerna's [Independent mode](https://github.com/lerna/lerna#independent-mode---independent).

## Deprecated Packages

### **Deprecated** <del>[@monorepo-utils/publish](./packages/@monorepo-utils/publish)</del>

[@monorepo-utils/publish](./archives/publish) help npm publish.

This script split `lerna publish`(lerna 2) into versioning and publishing.

:warning: Notes:

lerna 3 support `lerna version` and `lerna publish`.
You should use lerna 3 directly.

