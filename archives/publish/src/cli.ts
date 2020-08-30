#!/usr/bin/env node

import { publish } from "./publish";
import { execRead, getUnexecutedCommands } from "./utils/utils";

const chalk = require("chalk");
const meow = require("meow");

const cli = meow(
    `
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
`,
    {
        autoVersion: true,
        autoHelp: true,
        flags: {
            dry: {
                type: "boolean"
            },
            yes: {
                type: "boolean"
            },
            ci: {
                type: "boolean"
            },
            distTag: {
                type: "string"
            }
        }
    }
);

const dryRunMode = !!cli.flags.dry;
if (dryRunMode) {
    console.log(
        chalk`
    {green.bold dry-run mode}
    `
    );
}

export async function run() {
    const projectDir = await execRead("git rev-parse --show-toplevel");
    const ciMode = !!cli.flags.ci;
    const distTag = cli.flags.distTag;
    await publish({
        projectDir,
        dry: dryRunMode,
        skipPrompt: ciMode ? true : !!cli.flags.yes,
        ciMode: ciMode,
        distTag
    });
    console.log(
        chalk`
    {green.bold Publish successful!}
    ${getUnexecutedCommands()}
  `.replace(/\n +/g, "\n")
    );
}
