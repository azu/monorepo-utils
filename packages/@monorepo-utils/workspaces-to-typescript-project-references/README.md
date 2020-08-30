# @monorepo-utils/workspaces-to-typescript-project-references

This tool convert `lerna.json`/npm workspaces/yarn workspaces to [TypeScript's Project References](https://www.typescriptlang.org/docs/handbook/project-references.html).

This tool allows you to update `tsconfig.json`'s `references` property and test it. 

This monorepo use this tool as self-integration.

## Supports

- Lerna(`lerna.json`)
- Yarn's workspaces
- npm v7+'s workspaces
- [ ] pnpm workspace. refer to <https://github.com/Bessonov/set-project-references>
- [ ] Custom workspace

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
       
    Examples
      # Update project references in tsconfig.json
      $ workspaces-to-typescript-project-references --write
      # Test on CI
      $ workspaces-to-typescript-project-references --check

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
