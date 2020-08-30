import meow from "meow";
import path from "path";
import { toProjectReferences } from "./index";

export const cli = meow(
    `
    Usage
      $ workspaces-to-typescript-project-references
 

    Options
      --root             [Path:string] Root directory of the monorepo. 
                         Default: current working directory
      --check            If set the flag, check only differences of tsconfig.json and does not update tsconfig.json.
                         If the check is failed, exit status 1. It is useful for testing.
       
      --plugin           [Path:string] Path to plugin script.
                         Load the plugin script as module and use it. 
                           
    Examples
      # Update project references in tsconfig.json
      $ workspaces-to-typescript-project-references
      # Test on CI
      $ workspaces-to-typescript-project-references --check
`,
    {
        flags: {
            root: {
                type: "string",
                default: process.cwd()
            },
            check: {
                type: "boolean",
                default: false
            },
            plugin: {
                type: "string",
                isMultiple: true
            }
        },
        autoHelp: true,
        autoVersion: true
    }
);

export const run = async (
    _input = cli.input,
    flags = cli.flags
): Promise<{ exitStatus: number; stdout: string | null; stderr: string | null }> => {
    const plugins = Array.isArray(flags.plugin)
        ? flags.plugin.map((pluginPath) => require(path.join(process.cwd(), pluginPath)))
        : undefined;
    const result = toProjectReferences({
        rootDir: flags.root,
        checkOnly: flags.check,
        plugins
    });
    if (result.ok) {
        return {
            exitStatus: 0,
            stdout: flags.check ? "" : "Update Project References!",
            stderr: null
        };
    } else if (result.aggregateError) {
        return {
            exitStatus: 1,
            stdout: null,
            stderr: result.aggregateError.message + "\n\n" + result.aggregateError.errors.join("\n")
        };
    }
    return {
        exitStatus: 0,
        stdout: null,
        stderr: null
    };
};
