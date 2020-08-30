import meow from "meow";
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
       
    Examples
      # Update project references in tsconfig.json
      $ workspaces-to-typescript-project-references --write
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
    const result = toProjectReferences({
        rootDir: flags.root,
        checkOnly: flags.check
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
