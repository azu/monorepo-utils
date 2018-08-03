const inquirer = require("inquirer");
const { getPackages } = require("@monorepo-utils/package-utils");
const canNpmPublish = require("can-npm-publish").canNpmPublish;
import { execUnlessDry, log, logPromise } from "./utils/utils";
import { asyncFilter } from "./utils/async-utils";

/**
 * publish packages to npm
 */
export const publish = async ({
    projectDir,
    dry,
    skipPrompt,
    ciMode,
    distTag
}: {
    projectDir: string;
    dry: boolean;
    skipPrompt: boolean;
    ciMode: boolean;
    distTag?: string;
}): Promise<void> => {
    const packages = getPackages(projectDir);
    const publishablePackages = await asyncFilter(packages, async (pkg: any) => {
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
    const answers = skipPrompt
        ? {
              publish: true
          }
        : await inquirer.prompt([
              {
                  type: "confirm",
                  name: "publish",
                  message: `Do you publish these packages?
${publishablePackages
                      .map((pkg: any) => {
                          return `- ${pkg.package.name}@${pkg.package.version}`;
                      })
                      .join("\n")}
`
              }
          ]);
    if (!answers["publish"]) {
        return log("No publish");
    }
    // npm publish
    await publishablePackages.reduce((promise: Promise<any>, pkg: any) => {
        return promise.then(() => {
            const location = pkg.location;
            const args: string[] = [];
            if (distTag) {
                args.push("--tag", distTag);
            }

            const task = execUnlessDry(`npm publish ` + args.join(" "), {
                cwd: location,
                dry
            });
            let message = `${pkg.package.name}@${pkg.package.version}`;
            if (distTag) {
                message += `, distTag: @${distTag}`;
            }
            return logPromise(task, message, {
                ciMode: ciMode
            });
        });
    }, Promise.resolve());
};
