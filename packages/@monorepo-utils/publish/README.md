# @monorepo-utils/publish

Publish packages to npm if needed. 

## Install
   
     npm install --save-dev @monorepo-utils/publish

## Usage

    Usage
      $ monorepo-utils-publish

    Options:
      --dry Enable dry run mode
      --yes Yes all
      --ci  CI mode includes --yes flag
      --dist-tag dist-tag for npm

    Examples
      # publish 
      $ monorepo-utils-publish --dry
      # publish with --tag
      # https://docs.npmjs.com/cli/publish
      $ monorepo-utils-publish --dist-tag next
      
      # dry-run mode
      $ monorepo-utils-publish --dry
      # manually publish
      # CI mode
      $ monorepo-utils-publish --ci


## Publish

Publish packages that are publish-able.

[can-npm-publish](https://github.com/azu/can-npm-publish) detect publish-able of the package.

**Dry-run**:

Test publishing with `--dry`

    $ monorepo-utils-publish --dry

Actual publishing:

    $ monorepo-utils-publish 

CI flag skip interactive mode.

    $ monorepo-utils-publish --ci

## UseCase

You can use this script for splitting tagging and publishing.

For example, [@lerna/publish](https://github.com/lerna/lerna/tree/master/commands/publish#readme) does tag and publish together.
You want to split that process into two phase.

1. Tagging(update version and git tag) 

```
$ lerna publish --skip-npm --conventional-commits
````

2. Publishing

```
monorepo-utils-publish
```
