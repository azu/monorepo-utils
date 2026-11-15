#!/usr/bin/env bash
# Submit the current package to npm staging area if the version is not published yet.
# Run in each package by `pnpm -r exec`, which sets PNPM_PACKAGE_NAME.
set -euo pipefail
version=$(jq -r .version package.json)
if npm view "${PNPM_PACKAGE_NAME}@${version}" version > /dev/null 2>&1; then
  echo "${PNPM_PACKAGE_NAME}@${version} is already published"
else
  npm stage publish --access public
fi
