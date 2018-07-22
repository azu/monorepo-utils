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
      --directory the root directory of monorepo
      --template  handlebars template path

    Examples
      $ collect-changelog-from-tag --directory /path/to/monorepo-project/ "tag@version"
      # current directory is project root
      $ collect-changelog-from-tag "tag@version"
`,
    {
        flags: {
            directory: {
                type: "string"
            },
            template: {
                type: "string"
            }
        },
        autoHelp: true,
        autoVersion: true
    }
);

const monorepoDirectory = path.resolve(process.cwd(), cli.flags.directory || "");
const promises = cli.input.map(tag => {
    return execute({
        directory: monorepoDirectory,
        lernaTag: tag,
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
