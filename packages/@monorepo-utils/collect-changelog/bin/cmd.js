#!/usr/bin/env node
"use strict";
const meow = require("meow");
const path = require("path");
const execute = require("../lib/cli").execute;

const cli = meow(
    `
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
      
`,
    {
        flags: {
            directory: {
                type: "string"
            },
            changelog: {
                type: "string"
            },
            template: {
                type: "string"
            },
            name: {
                type: "string"
            }
        },
        autoHelp: true,
        autoVersion: true
    }
);

const monorepoDirectory = path.resolve(process.cwd(), cli.flags.directory || "");
const name = cli.flags.name;
const changelogFilePath = cli.flags.changelog ? path.resolve(process.cwd(), cli.flags.changelog || "") : undefined;
const promises = cli.input.map(tag => {
    return execute({
        changelogFilePath,
        directory: monorepoDirectory,
        name: name,
        tag: tag,
        templatePath: cli.flags.template
    });
});
// show results
Promise.all(promises)
    .then(results => {
        results.forEach(result => {
            console.log(result);
        });
    })
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
