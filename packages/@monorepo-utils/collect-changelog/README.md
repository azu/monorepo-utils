# @monorepo-utils/collect-changelog

Collect CHANGELOG from tags.

## Feature

- Support independent mode
    - Currently it support [Independent mode](https://github.com/lerna/lerna#independent-mode---independent) only
- Get CHANGELOG from each package's `CHANGELOG.md`

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @monorepo-utils/collect-changelog

## Usage

    Usage
      $ collect-changelog-from-tag [option] "tag@version"

    Options
      --changelog the file path of CHANGELOG.md
      --directory the root directory of monorepo
      --template  handlebars template path
      --name set package name if it not defined

    Examples
      $ collect-changelog-from-tag --directory /path/to/monorepo-project/ "tag@version"
      # current directory is project root for independent mode
      $ collect-changelog-from-tag "tag@version"
      # get changelog content from specific CHANGELOG.md for fixed mode
      $ collect-changelog-from-tag --changelog ./CHANGELOG.md "tag@version"
      

## Example

    $ monorepo-utils-collect-changelog "textlint@8.0.0"
    
    ## textlint@8.0.0
    
    ### fixes
    
    - **babel:** ignore lib directory ([12e581d](https://github.com/textlint/textlint/commit/12e581d))
    - **fixer:** fix thrown error when empty result. (#274) ([7013cee](https://github.com/textlint/textlint/commit/7013cee)), closes [#274](https://github.com/textlint/textlint/issues/274)
    - **textilnt:** fix JSDoc ([8a417e0](https://github.com/textlint/textlint/commit/8a417e0))
    
    ### features
    
    - **packages:** import textlint-plugin-text ([1b7a571](https://github.com/textlint/textlint/commit/1b7a571))
    - **textlint:** update built-in textlint-plugin-markdown@^2 (#282) ([448fef9](https://github.com/textlint/textlint/commit/448fef9))
    
    ### breakingChanges
    
    - **textlint:** markdown-to-ast@4 includes some breaking change

Get all changelog at point.

    $ lerna publish --skip-npm
    # tag each packages
    $ git tag --points-at HEAD | xargs -I{} monorepo-utils-collect-changelog {}
    # get CHANGELOG from each packages

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
