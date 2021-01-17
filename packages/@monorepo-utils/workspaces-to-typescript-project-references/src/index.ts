import fs from "fs";
import path from "upath";
import commentJSON from "comment-json";
import { plugin as workspacesPlugin } from "./manager/workspaces";
import assert from "assert";
import { PackageManagerPlugin } from "./manager/PackageManagerPlugin";

export const DEFAULT_TSCONFIGPATH = "tsconfig.json";

export type Options = {
    rootDir: string;
    checkOnly: boolean;
    plugins?: PackageManagerPlugin[];
    tsConfigPath?: string;
    tsConfigPathFinder?(location: string): string;
};
export type ToProjectReferencesResult =
    | {
          ok: true;
      }
    | {
          ok: false;
          aggregateError: {
              message: string;
              errors: Error[];
          };
      };
export const toProjectReferences = (options: Options) => {
    const plugins = Array.isArray(options.plugins) && options.plugins.length > 0 ? options.plugins : [workspacesPlugin];
    const pluginImplementations = plugins.map((plugin) => plugin(options));
    // use first plugin
    const supportPlugin = pluginImplementations.find((plugin) => {
        return plugin.supports();
    });
    if (!supportPlugin) {
        throw new Error("Not found supported plugin");
    }
    const relativeName = (pkgPath: string) => {
        return path.relative(options.rootDir, pkgPath);
    };
    const allPackages = supportPlugin.getAllPackages();
    const errors: Error[] = [];
    allPackages.forEach((packageInfo) => {
        const tsconfigFilePath =
            options.tsConfigPathFinder?.(packageInfo.location) ?? path.join(packageInfo.location, DEFAULT_TSCONFIGPATH);
        if (!fs.existsSync(tsconfigFilePath)) {
            // Skip has not tsconfig.json
            return;
        }
        const tsconfigJSON = commentJSON.parse(fs.readFileSync(tsconfigFilePath, "utf-8"));
        const references = supportPlugin.getDependencies(packageInfo.packageJSON);
        const newProjectReferences = references
            .map((reference) => {
                const absolutePathOrNull = supportPlugin.resolve(reference);
                if (!absolutePathOrNull) {
                    return;
                }
                const tsConfigDirName = path.dirname(options.tsConfigPath ?? DEFAULT_TSCONFIGPATH);
                const absolutePath = path.join(absolutePathOrNull, tsConfigDirName);
                if (!path.isAbsolute(absolutePath)) {
                    throw new Error(
                        `Plugin#resolve should return absolute path: ${absolutePath}, plugin: ${supportPlugin}`
                    );
                }
                if (packageInfo.location === absolutePath) {
                    const selfName = relativeName(packageInfo.location);
                    errors.push(
                        new Error(
                            `[${selfName}] Self dependencies is something wrong: ${selfName} refer to ${relativeName(
                                absolutePath
                            )}`
                        )
                    );
                }
                const resolvePath = path.dirname(path.resolve(packageInfo.location, tsconfigFilePath));
                return {
                    path: path.relative(resolvePath, absolutePath)
                };
            })
            .filter((r) => Boolean(r));
        const currentProjectReferences: { path: string }[] = tsconfigJSON["references"] ?? [];
        if (options.checkOnly) {
            // check
            try {
                // create pure object for compare
                const cleanCurrentProjectReferences = JSON.parse(
                    JSON.stringify(commentJSON.parse(commentJSON.stringify(currentProjectReferences), undefined, true))
                );
                assert.deepStrictEqual(cleanCurrentProjectReferences, newProjectReferences);
            } catch (error) {
                const selfName = relativeName(packageInfo.location);
                errors.push(new Error(`[${selfName}] ${error.message}`));
            }
            return;
        } else {
            // update
            if (errors.length === 0) {
                tsconfigJSON["references"] = newProjectReferences;
                fs.writeFileSync(tsconfigFilePath, commentJSON.stringify(tsconfigJSON, null, 2), "utf-8");
            }
        }
    });
    if (errors.length > 0) {
        return {
            ok: false,
            aggregateError: {
                message: `workspaces-to-typescript-project-references found ${errors.length} errors.

Please update your tsconfig.json via following command.

$ workspaces-to-typescript-project-references
`,
                errors
            }
        };
    }
    return {
        ok: true
    };
};
