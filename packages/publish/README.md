# release-script

Publish packages to npm if needed. 

## Usage

    Usage
      $ release-script

    Options:
      --dry Enable dry run mode
      --yes Yes all
      --ci  CI mode includes --yes flag

    Examples
      # dry-run mode
      $ release-script --dry
      # manually publish
      # CI mode
      $ release-script --ci

## Publish

Publish packages that are publish-able.

[can-npm-publish](https://github.com/azu/can-npm-publish) detect publish-able of the package.

**Dry-run**:

Test publishing with `--dry`

    $ release-script-publish --dry

Actual publishing

    $ release-script-publish 

CI flag skip interactive mode.

    $ release-script-publish --yes
