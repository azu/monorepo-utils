import { parseArgs } from "node:util";
import path from "./path";
import { DEFAULT_TSCONFIGPATH, toProjectReferences, toRootProjectReferences } from "./index";

const helpText = `
    Usage
      $ workspaces-to-typescript-project-references
 

    Options
      --root             [Path:string] Root directory of the monorepo. 
                         Default: current working directory

      --check            If set the flag, check only differences of tsconfig.json and does not update tsconfig.json.
                         If the check is failed, exit status 1. It is useful for testing.
       
      --plugin           [Path:string] Path to plugin script.
                         Load the plugin script as module and use it. 
                           
      --tsconfigPath     [Path:string] Use alternative config path inside the package. e.g.: tsconfig.test.json
                         Default: tsconfig.json

      --includesRoot     If set the flag, generate <root>/tsconfig.json that includes all references.
                         It is useful to check all packages at once.

      --includesLocal    If set the flag, includes ./tsconfig.*.json

    Examples
      # Update project references in tsconfig.json
      $ workspaces-to-typescript-project-references
      # Test on CI
      $ workspaces-to-typescript-project-references --check
      # Update <root>/tsconfig.json that includes all references to packages
      $ workspaces-to-typescript-project-references --includesRoot
      $ workspaces-to-typescript-project-references --includesRoot --check
`;

const parseCliArgs = () => {
    const { values, positionals } = parseArgs({
        allowPositionals: true,
        options: {
            root: {
                type: "string",
                default: process.cwd()
            },
            includesRoot: {
                type: "boolean",
                default: false
            },
            includesLocal: {
                type: "boolean",
                default: false
            },
            check: {
                type: "boolean",
                default: false
            },
            plugin: {
                type: "string",
                multiple: true
            },
            tsconfigPath: {
                type: "string",
                default: DEFAULT_TSCONFIGPATH
            },
            help: {
                type: "boolean",
                default: false
            },
            version: {
                type: "boolean",
                default: false
            }
        }
    });
    return { input: positionals, flags: values };
};

export const cli = (() => {
    const parsed = parseCliArgs();
    if (parsed.flags.help) {
        console.log(helpText);
        process.exit(0);
    }
    if (parsed.flags.version) {
        console.log(require("../package.json").version);
        process.exit(0);
    }
    return parsed;
})();

export const run = async (
    _input = cli.input,
    flags = cli.flags
): Promise<{ exitStatus: number; stdout: string | null; stderr: string | null }> => {
    const plugins = Array.isArray(flags.plugin)
        ? flags.plugin.map((pluginPath) => {
              const plugin = require(path.join(process.cwd(), pluginPath));
              if (typeof plugin.plugin !== "function") {
                  throw new Error("plugin should export { plugin }.");
              }
              return plugin.plugin;
          })
        : undefined;
    const customTsConfigFinder = (location: string) => {
        return path.join(location, flags.tsconfigPath);
    };
    // Update <package>/tsconfig.json
    const projectResult = toProjectReferences({
        rootDir: flags.root,
        includesLocal: flags.includesLocal,
        checkOnly: flags.check,
        plugins,
        tsConfigPath: flags.tsconfigPath,
        tsConfigPathFinder: flags.tsconfigPath ? customTsConfigFinder : undefined
    });
    if (projectResult.aggregateError) {
        return {
            exitStatus: 1,
            stdout: null,
            stderr: projectResult.aggregateError.message + "\n\n" + projectResult.aggregateError.errors.join("\n")
        };
    }
    // Update <root>/tsconfig.json
    if (flags.includesRoot) {
        const rootProjectResult = toRootProjectReferences({
            rootDir: flags.root,
            includesLocal: flags.includesLocal,
            checkOnly: flags.check,
            plugins,
            tsConfigPath: flags.tsconfigPath,
            tsConfigPathFinder: flags.tsconfigPath ? customTsConfigFinder : undefined
        });
        if (rootProjectResult.aggregateError) {
            return {
                exitStatus: 1,
                stdout: null,
                stderr:
                    rootProjectResult.aggregateError.message +
                    "\n\n" +
                    rootProjectResult.aggregateError.errors.join("\n")
            };
        }
    }
    return {
        exitStatus: 0,
        stdout: flags.check ? "" : "Update Project References!",
        stderr: null
    };
};
