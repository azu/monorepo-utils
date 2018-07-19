#!/usr/bin/env node

const chalk = require("chalk");
const inquirer = require("inquirer");
const getPackages = require("./utils/get-pacakges");
const canNpmPublish = require("can-npm-publish").canNpmPublish;
const meow = require("meow");
const { execRead, log, logPromise, execUnlessDry, getUnexecutedCommands } = require("./utils/utils");
const { asyncFilter } = require("./utils/async-utils");
const cli = meow(
    `
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
            }
        }
    }
);

/**
 * publish packages to npm
 * @param {boolean} dry
 * @param {boolean} skipPrompt
 * @param {boolean} ciMode
 * @returns {Promise<void>}
 */
const publish = async ({ dry, skipPrompt, ciMode }) => {
    const projectDir = await execRead("git rev-parse --show-toplevel");
    const packages = getPackages(projectDir);
    const publishablePackages = await asyncFilter(packages, async pkg => {
        try {
            await canNpmPublish(pkg.location);
            return true;
        } catch (error) {
            return false;
        }
    });
    if (publishablePackages.length === 0) {
        return log("No need to publish.");
    }
    // confirm: npm publish if skipPrompt is false
    const answers = skipPrompt ? {
        publish: true
    } : await inquirer.prompt([
        {
            type: "confirm",
            name: "publish",
            message: `Do you publish these packages?
${publishablePackages.map(pkg => pkg.package.name).join(", ")}
`
        }
    ]);
    if (!answers["publish"]) {
        return log("No publish");
    }
    // npm publish
    await publishablePackages.reduce((promise, pkg) => {
        return promise.then(() => {
            const location = pkg.location;
            const task = execUnlessDry(`npm publish`, {
                cwd: location,
                dry
            });
            return logPromise(task, `${pkg.package.name}@${pkg.package.version}`, {
                ciMode: ciMode
            });
        });
    }, Promise.resolve());

    console.log(
        chalk`
    {green.bold Publish successful!}
    ${getUnexecutedCommands()}
  `.replace(/\n +/g, "\n")
    );
};


const dryRunMode = !!cli.flags.dry;
if (dryRunMode) {
    console.log(
        chalk`
    {green.bold dry-run mode}
    `);
}
const ciMode = !!cli.flags.ci;
publish({
    dry: dryRunMode,
    skipPrompt: ciMode ? true : !!cli.flags.yes,
    ciMode: ciMode
}).catch(error => {
    console.error(error);
    process.exit(1);
});
