# @monorepo-utils/workspaces-to-typescript-project-references

This tool convert lerna/npm workspaces/yarn workspaces to [TypeScript's Project References](https://www.typescriptlang.org/docs/handbook/project-references.html).

This tool allows you to update `tsconfig.json`'s `references` property and test it. 

This monorepo use this tool as self-integration.

## Supports

- [x] [Lerna](https://github.com/lerna/lerna)(`lerna.json`)
- [x] [Yarn's workspaces](https://classic.yarnpkg.com/en/docs/workspaces/))
    - [ ] [Workspace ranges (workspace:)](https://yarnpkg.com/features/workspaces#workspace-ranges-workspace)
- [x] [npm's workspaces](https://github.com/npm/rfcs/blob/26e8ac6ee176943d6522d5d057fab05e37655e1c/accepted/0000-workspaces.md)
- [ ] pnpm workspaces. refer to <https://github.com/Bessonov/set-project-references>
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
                           
    Examples
      # Update project references in tsconfig.json
      $ workspaces-to-typescript-project-references
      # Test on CI
      $ workspaces-to-typescript-project-references --check

## Plugin

- [ ] Add a document about `--plugin` and Plugin implementation
- We need to support to plugin for custom resolution
- For more details, See [Plugin interface](./src/manager/PackageManagerPlugin.ts)

## Examples

Following project use this tools.

- [monorepo-utils](https://github.com/azu/monorepo-utils) it-self
- [textlint](https://github.com/textlint/textlint)

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
