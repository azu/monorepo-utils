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
    # Execute command for each package
    $ npx -y -q @monorepo-utils/get-workspaces-cli | xargs -I{} sh -c 'cd {}; pwd'

## Examples

In https://github.com/textlint/textlint

```bash
$ npx -y -q @monorepo-utils/get-workspaces-cli
~/workspace/github.com/textlint/textlint/packages/gulp-textlint
~/workspace/github.com/textlint/textlint/packages/textlint
~/workspace/github.com/textlint/textlint/packages/textlint-scripts
~/workspace/github.com/textlint/textlint/packages/textlint-tester
~/workspace/github.com/textlint/textlint/examples/cli
~/workspace/github.com/textlint/textlint/examples/config-file
~/workspace/github.com/textlint/textlint/examples/config-in-package-json
~/workspace/github.com/textlint/textlint/examples/filter
~/workspace/github.com/textlint/textlint/examples/fix
~/workspace/github.com/textlint/textlint/examples/fix-dry-run
~/workspace/github.com/textlint/textlint/examples/html-plugin
~/workspace/github.com/textlint/textlint/examples/perf
~/workspace/github.com/textlint/textlint/examples/plugin-extensions-option
~/workspace/github.com/textlint/textlint/examples/preset
~/workspace/github.com/textlint/textlint/examples/rulesdir
~/workspace/github.com/textlint/textlint/examples/use-as-module
~/workspace/github.com/textlint/textlint/examples/use-as-ts-module
~/workspace/github.com/textlint/textlint/packages/@textlint/ast-node-types
~/workspace/github.com/textlint/textlint/packages/@textlint/ast-tester
~/workspace/github.com/textlint/textlint/packages/@textlint/ast-traverse
~/workspace/github.com/textlint/textlint/packages/@textlint/config-loader
~/workspace/github.com/textlint/textlint/packages/@textlint/feature-flag
~/workspace/github.com/textlint/textlint/packages/@textlint/fixer-formatter
~/workspace/github.com/textlint/textlint/packages/@textlint/kernel
~/workspace/github.com/textlint/textlint/packages/@textlint/linter-formatter
~/workspace/github.com/textlint/textlint/packages/@textlint/markdown-to-ast
~/workspace/github.com/textlint/textlint/packages/@textlint/module-interop
~/workspace/github.com/textlint/textlint/packages/@textlint/source-code-fixer
~/workspace/github.com/textlint/textlint/packages/@textlint/text-to-ast
~/workspace/github.com/textlint/textlint/packages/@textlint/textlint-plugin-markdown
~/workspace/github.com/textlint/textlint/packages/@textlint/textlint-plugin-text
~/workspace/github.com/textlint/textlint/packages/@textlint/types
~/workspace/github.com/textlint/textlint/packages/@textlint/utils
~/workspace/github.com/textlint/textlint/packages/textlint-scripts/example
~/workspace/github.com/textlint/textlint/packages/textlint-scripts/example-ts
~/workspace/github.com/textlint/textlint/packages/textlint-scripts/example-dynamic-import
~/workspace/github.com/textlint/textlint/test/benchmark
~/workspace/github.com/textlint/textlint/test/integration-test
~/workspace/github.com/textlint/textlint/website
```


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
