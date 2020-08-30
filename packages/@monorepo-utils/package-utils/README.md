# @monorepo-utils/package-utils

Package utility for monorepo.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @monorepo-utils/package-utils

## Usage

### `getPackages(rootDirectory: string): PackageResult[]`

```ts
export interface PackageResult {
    // path to package's directory
    location: string;
    // package.json content
    packageJSON: any;
}
export declare const getPackages: (rootDirectory: string) => PackageResult[];
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
