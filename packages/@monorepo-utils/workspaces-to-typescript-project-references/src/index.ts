import fs from "fs";
import path from "upath";
import commentJSON from "comment-json";
import { plugin as workspacesPlugin } from "./manager/workspaces";
import assert from "assert";
import { PackageManagerPlugin } from "./manager/PackageManagerPlugin";

export const DEFAULT_TSCONFIGPATH = "tsconfig.json";

// https://www.typescriptlang.org/docs/handbook/project-references.html
type ProjectReference = {
    path: string;
    prepend?: boolean;
};
const sortReferences = (references: ProjectReference[]) => {
    return references.slice().sort((refA, refB) => (refA.path > refB.path ? 1 : -1));
};

export type Options = {
    rootDir: string;
    checkOnly: boolean;
    plugins?: PackageManagerPlugin[];
    tsConfigPath?: string;
    tsConfigPathFinder?(location: string): string;
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
                const tsConfigPath = options.tsConfigPath ?? DEFAULT_TSCONFIGPATH;
                const tsConfigDirName = path.dirname(tsConfigPath);
                const pathComponents = [absolutePathOrNull, tsConfigDirName];

                // If the file name is not tsconfig.json (the default),
                // then append it to the generated path
                const tsConfigFileName = path.basename(tsConfigPath);
                if (tsConfigFileName !== DEFAULT_TSCONFIGPATH) {
                    pathComponents.push(tsConfigFileName);
                }

                const absolutePath = path.join(...pathComponents);
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
            .filter((r) => Boolean(r)) as ProjectReference[];
        const currentProjectReferences: { path: string }[] = tsconfigJSON["references"] ?? [];
        if (options.checkOnly) {
            // check
            try {
                // create pure object for compare
                const cleanCurrentProjectReferences = JSON.parse(
                    JSON.stringify(commentJSON.parse(commentJSON.stringify(currentProjectReferences), undefined, true))
                );
                // TODO: move sorting to updating logic when next major release
                // https://github.com/azu/monorepo-utils/issues/44
                assert.deepStrictEqual(
                    sortReferences(cleanCurrentProjectReferences),
                    sortReferences(newProjectReferences)
                );
            } catch (error) {
                const selfName = relativeName(packageInfo.location);
                errors.push(new Error(`[${selfName}] ${error.message}`));
            }
            return;
        } else {
            // update
            if (errors.length === 0) {
                tsconfigJSON["references"] = newProjectReferences;
                const oldContents = commentJSON.stringify(
                    commentJSON.parse(fs.readFileSync(tsconfigFilePath, { encoding: "utf-8" })),
                    null,
                    2
                );
                const newContents = commentJSON.stringify(tsconfigJSON, null, 2);
                if (newContents !== oldContents) {
                    fs.writeFileSync(tsconfigFilePath, `${newContents}\n`, "utf-8");
                }
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

export const toRootProjectReferences = (options: Options) => {
    const plugins = Array.isArray(options.plugins) && options.plugins.length > 0 ? options.plugins : [workspacesPlugin];
    const pluginImplementations = plugins.map((plugin) => plugin(options));
    // use first plugin
    const supportPlugin = pluginImplementations.find((plugin) => {
        return plugin.supports();
    });
    if (!supportPlugin) {
        throw new Error("Not found supported plugin");
    }
    const allPackages = supportPlugin.getAllPackages();
    const errors: Error[] = [];
    const rootTsconfigFilePath =
        options.tsConfigPathFinder?.(options.rootDir) ?? path.join(options.rootDir, DEFAULT_TSCONFIGPATH);
    if (!fs.existsSync(rootTsconfigFilePath)) {
        return {
            ok: false,
            aggregateError: {
                message: `Not found tsconfig.json in ${rootTsconfigFilePath}`,
                errors
            }
        };
    }
    const tsconfigJSON = commentJSON.parse(fs.readFileSync(rootTsconfigFilePath, "utf-8"));
    const projectReferences = allPackages.map((pkg) => {
        return {
            path: path.relative(options.rootDir, pkg.location)
        };
    });
    if (options.checkOnly) {
        // check
        try {
            const currentProjectReferences: { path: string }[] = tsconfigJSON["references"] ?? [];
            const cleanCurrentProjectReferences = JSON.parse(
                JSON.stringify(commentJSON.parse(commentJSON.stringify(currentProjectReferences), undefined, true))
            );
            // TODO: move sorting to updating logic when next major release
            // https://github.com/azu/monorepo-utils/issues/44
            assert.deepStrictEqual(sortReferences(cleanCurrentProjectReferences), sortReferences(projectReferences));
        } catch (error) {
            errors.push(new Error(`[root] ${error.message}`));
        }
    } else {
        const updatedTsConfigJSON = {
            ...tsconfigJSON,
            references: projectReferences
        };
        const oldContents = commentJSON.stringify(projectReferences, null, 2);
        const newContents = commentJSON.stringify(updatedTsConfigJSON, null, 2);
        if (newContents !== oldContents) {
            fs.writeFileSync(rootTsconfigFilePath, `${newContents}\n`, "utf-8");
        }
    }
    if (errors.length > 0) {
        return {
            ok: false,
            aggregateError: {
                message: `workspaces-to-typescript-project-references found ${errors.length} errors in root tsconfig.

Please update your <root>/tsconfig.json via following command.

$ workspaces-to-typescript-project-references --includesRoot
`,
                errors
            }
        };
    }
    return {
        ok: true
    };
};
