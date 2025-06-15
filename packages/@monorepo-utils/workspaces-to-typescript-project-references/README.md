# @monorepo-utils/workspaces-to-typescript-project-references

This tool convert lerna/npm/yarn workspaces to [TypeScript's Project References](https://www.typescriptlang.org/docs/handbook/project-references.html).

You can keep package dependencies synchronized between lerna/npm/yarn workspaces and TypeScript.

This monorepo use this tool as self-integration.

## Features

- Sync between monorepo workspaces and [TypeScript's Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
- Preserve `tsconfig.json`'s comments
- Custom Plugin support

## Supports

- [x] [Lerna](https://github.com/lerna/lerna)(`lerna.json`)
- [x] [Yarn's workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
    - [x] [Workspace ranges (workspace:)](https://yarnpkg.com/features/workspaces#workspace-ranges-workspace) [#29](https://github.com/azu/monorepo-utils/issues/29)
- [x] [npm's workspaces](https://github.com/npm/rfcs/blob/26e8ac6ee176943d6522d5d057fab05e37655e1c/accepted/0000-workspaces.md)
- [x] [pnpm workspaces](https://pnpm.io/workspaces)
- [x] Custom workspaces
    - Plugin support

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @monorepo-utils/workspaces-to-typescript-project-references

## Usage

This tool provides updating feature and testing feature.

    Usage
      $ workspaces-to-typescript-project-references
 

    Options
      --root             [Path:string] Root directory of the monorepo. 
                         Default: current working directory

      --check            If set the flag, check only differences of tsconfig.json and does not update tsconfig.json.
                         If the check is failed, exit status 1. It is useful for testing.       
      --plugin           [Path:string] Path to plugin script.
                         Load the plugin script as module and use it. 
                           
      --tsconfigPath     [Path:string] Use alternative config path inside the package. e.g.: tsconfig.test.json
                         Default: tsconfig.json

      --includesRoot     If set the flag, update <root>/<tsconfigPath> with all project references.
                         It is useful to check all packages at once.

      --includesLocal    If set the flag, includes ./tsconfig.*.json

    Examples
      # Update project references in tsconfig.json
      $ workspaces-to-typescript-project-references
      # Test on CI
      $ workspaces-to-typescript-project-references --check

      # Update <root>/tsconfig.json that includes all references to packages
      $ workspaces-to-typescript-project-references --includesRoot
      $ workspaces-to-typescript-project-references --includesRoot --check

:memo: Tips `--includesRoot`

If `--includesRoot` is passed, this tool also update `references` in `<root>/<tsconfigPath>`.

For example. You can update `<root>/tsconfig.json` to following.

```json5
{
  "compilerOptions": {
    // ...
  },
  "files": [],
  "include": [],
  "exclude": [],
  "references": [
    {
      "path": "packages/@monorepo-utils/collect-changelog"
    },
    {
      "path": "packages/@monorepo-utils/package-utils"
    },
    {
      "path": "packages/@monorepo-utils/workspaces-to-typescript-project-references"
    }
  ]
}
```

You can build all packages at once by `tsc --build .` in root dir.

- Example: [package.json](./package.json) and [tsconfig.json](./tsconfig.json)
- [Optimizing multi-package apps with TypeScript Project References | by Mirko Kruschke | eBay Tech Berlin](https://ebaytech.berlin/optimizing-multi-package-apps-with-typescript-project-references-d5c57a3b4440)
- [Migrating Large TypeScript Codebases To Project References — Developer Tooling (2021)](https://shopify.engineering/migrating-large-typescript-codebases-project-references)

## Plugin

[@monorepo-utils/workspaces-to-typescript-project-references](https://github.com/azu/monorepo-utils/tree/master/packages/@monorepo-utils/workspaces-to-typescript-project-references) support to plugin for custom resolution.

You can write a plugin for own monorepo tools.

For example, [Bolt](https://github.com/boltpkg/bolt) has a workspaces, but a bit different with lerna/yarn style.
Bolt require [`bolt.workspaces` in `package.json`](https://github.com/boltpkg/bolt#configuration).

[get-monorepo-packages](https://github.com/azz/get-monorepo-packages) support bolt's `workspaces`.
So, you can write `bolt-plugin.js` as following.

`bolt-plugin.js`:
```js
const getPackages = require("get-monorepo-packages");
const plugin = (options) => {
    const monorepoPackages = getPackages(options.rootDir);
    return {
        supports() {
            return monorepoPackages.length > 0;
        },
        getAllPackages() {
            return monorepoPackages;
        },
        getDependencies(packageJSON) {
            const dependencies = Object.entries(packageJSON.dependencies ?? {});
            const devDependencies = Object.entries(packageJSON.devDependencies ?? {});
            return [...dependencies, ...devDependencies].map((dep) => {
                return {
                    name: dep[0]
                };
            });
        },
        resolve({ name }) {
            const matchPkg = monorepoPackages.find((info) => {
                return info.package.name === name;
            });
            if (!matchPkg) {
                return null;
            }
            return matchPkg.location;
        }
    };
};
module.exports.plugin = plugin;
```

You can use this plugin via `--plugin` flag.

```
$ npm install @monorepo-utils/workspaces-to-typescript-project-references -g
$ workspaces-to-typescript-project-references --plugin ./bolt-plugin.js
```
 
For more details, See [Plugin interface](./src/manager/PackageManagerPlugin.ts)

## Examples

For example, [monorepo-utils](https://github.com/azu/monorepo-utils) it-self use this tool.
[monorepo-utils](https://github.com/azu/monorepo-utils) use lerna and yarn workspaces.

### pnpm Workspaces Example

```yaml
# pnpm-workspace.yaml
packages:
  - "packages/*"
  - "apps/*"
```

The tool will automatically detect pnpm workspaces and convert them to TypeScript project references.

- [workspaces definition](https://github.com/azu/monorepo-utils/blob/99fcc68078fae56a8c84f4a9bf4bdff7a3d4cc76/package.json#L26-L31) on root's package.json

```json
{
  "workspaces": {
    "packages": [
      "packages/*",
      "packages/@monorepo-utils/*"
    ]
  }
}
```

- `@monorepo-utils/workspaces-to-typescript-project-references` has [dependencies](https://github.com/azu/monorepo-utils/blob/39b7bacee6094096adca5ac5c9c2d2a759a38419/packages/@monorepo-utils/workspaces-to-typescript-project-references/package.json#L71) to [@monorepo-utils/package-utils](../package-utils)

```json
  "dependencies": {
    "@monorepo-utils/package-utils": "^2.2.0",
    "comment-json": "^3.0.3",
    "meow": "^7.1.1"
  }
```

To run `workspaces-to-typescript-project-references` and update [tsconfig.json](https://github.com/azu/monorepo-utils/blob/e83e457371bc30d3332da3082ecc5a4de848e128/packages/%40monorepo-utils/workspaces-to-typescript-project-references/tsconfig.json#L38-L42) 

```json
  "references": [
    {
      "path": "../package-utils"
    }
  ]
```

As another examples, Following project use this tools.

- [textlint](https://github.com/textlint/textlint)

## Related

- [Infer project references from common monorepo patterns / tools · Issue #25376 · microsoft/TypeScript](https://github.com/microsoft/TypeScript/issues/25376)

## Changelog

See [Releases page](https://github.com/azu/monorepo-utils/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/monorepo-utils/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
