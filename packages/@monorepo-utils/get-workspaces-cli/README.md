# @monorepo-utils/package-utils

A CLI that get "workspaces" package locations from monorepo.

## Usage

    Usage: npx @monorepo-utils/get-workspaces-cli [options]
    
    Options:
    --help, -h        Show this help message
    --cwd <path>      Current working directory (default: process.cwd())
    --format <format> Output format (default: line) Supported formats: line, json
    --filter <filter> Filter packages by package's name (default: undefined)
    
    Examples:
    # Get parsable workspace paths
    $ npx -y -q @monorepo-utils/get-workspaces-cli
    # Filter packages by package's name
    $ npx -y -q @monorepo-utils/get-workspaces-cli --filter example-name


## Changelog

See [Releases page](https://github.com/azu/monorepo-utils/releases).

## Running tests

    yarn test

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

Thanks to [azz/get-monorepo-packages: Get a list of packages from a monorepo](https://github.com/azz/get-monorepo-packages)
