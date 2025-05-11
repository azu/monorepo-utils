import fs from "fs";
import path from "upath";
import commentJSON from "comment-json";
import { plugin as workspacesPlugin } from "./manager/workspaces";
import assert from "assert";
import { PackageManagerPlugin, PackageReference } from "./manager/PackageManagerPlugin";

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
    includesLocal: boolean;
    checkOnly: boolean;
    plugins?: PackageManagerPlugin[];
    tsConfigPath?: string;
    tsConfigPathFinder?(location: string): string;
};

const getReferenceInPackage = (tsconfigFilePath: string) => {
    try {
        const dirPath = path.dirname(tsconfigFilePath);
        const fileName = path.basename(tsconfigFilePath);
        const files = fs.readdirSync(dirPath);
    
        const tsconfigFilePaths = files
            .filter(file => file !== fileName && file.startsWith('tsconfig.') && file.endsWith('.json'))
            .map(file => ({ path: `./${file}`}));

        return tsconfigFilePaths;
    } catch (err) {
        return [];
    }
}

// when tsconfig.json → ../path/to/dir
// when tsconfig.x.json → ../path/to/dir/tsconfig.x.json
const getReferencePathToTsConfig = (options: { packageLocation: string; tsConfigPath?: string }) => {
    const tsConfigPath = options.tsConfigPath ?? DEFAULT_TSCONFIGPATH;
    const tsConfigDirName = path.dirname(tsConfigPath);
    const pathComponents = [options.packageLocation, tsConfigDirName];
    // If the file name is not tsconfig.json (the default),
    // then append it to the generated path
    const tsConfigFileName = path.basename(tsConfigPath);
    if (tsConfigFileName !== DEFAULT_TSCONFIGPATH) {
        pathComponents.push(tsConfigFileName);
    }
    return path.join(...pathComponents);
};

const validateDuplicatedDependencies = (packageReferences: PackageReference[]) => {
    const packageNameSet = new Set<string>();
    const errors: Error[] = [];
    packageReferences.forEach((ref) => {
        if (packageNameSet.has(ref.name)) {
            errors.push(
                new Error(`This package is deduplicated in dependencies and devDependencies: ${ref.name}

Please remove duplicate dependencies from dependencies or devDependencies.`)
            );
            return;
        }
        packageNameSet.add(ref.name);
    });
    return {
        ok: errors.length === 0,
        errors
    };
};

export type toProjectReferencesResult =
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
    const canNotRecoverErrors: Error[] = [];
    allPackages.forEach((packageInfo) => {
        const tsconfigFilePath =
            options.tsConfigPathFinder?.(packageInfo.location) ?? path.join(packageInfo.location, DEFAULT_TSCONFIGPATH);
        if (!fs.existsSync(tsconfigFilePath)) {
            // Skip has not tsconfig.json
            return;
        }
        const tsconfigJSON = commentJSON.parse(fs.readFileSync(tsconfigFilePath, "utf-8"));
        const references = supportPlugin.getDependencies(packageInfo.packageJSON);
        const resolvedReferences = references
            .map((reference) => {
                const absolutePathOrNull = supportPlugin.resolve(reference);
                if (!absolutePathOrNull) {
                    return;
                }
                if (!path.isAbsolute(absolutePathOrNull)) {
                    throw new Error(
                        `Plugin#resolve should return absolute path: ${absolutePathOrNull}, plugin: ${supportPlugin}`
                    );
                }
                return {
                    name: reference.name,
                    version: reference.version,
                    absolutePath: absolutePathOrNull
                };
            })
            .filter((r) => Boolean(r)) as (PackageReference & { absolutePath: string })[];
        const referenceValidateResult = validateDuplicatedDependencies(resolvedReferences);
        // if found an error, do early return: https://github.com/azu/monorepo-utils/issues/56
        if (!referenceValidateResult.ok) {
            canNotRecoverErrors.push(...referenceValidateResult.errors);
            return;
        }
        const newProjectReferences = resolvedReferences
            .map((reference) => {
                const absolutePath = reference.absolutePath;
                // Should ignore no-ts package
                // https://github.com/azu/monorepo-utils/issues/53
                const referencePackageTsConfigFilePath = path.resolve(
                    absolutePath,
                    options.tsConfigPath ?? DEFAULT_TSCONFIGPATH
                );
                if (!fs.existsSync(referencePackageTsConfigFilePath)) {
                    return;
                }
                // { path } value
                const referenceTsConfigPath = getReferencePathToTsConfig({
                    packageLocation: absolutePath,
                    tsConfigPath: options.tsConfigPath
                });
                if (packageInfo.location === referenceTsConfigPath) {
                    const selfName = relativeName(packageInfo.location);
                    errors.push(
                        new Error(
                            `[${selfName}] Self dependencies is something wrong: ${selfName} refer to ${relativeName(
                                referenceTsConfigPath
                            )}`
                        )
                    );
                }
                const basePackageLocation = path.dirname(path.resolve(packageInfo.location, tsconfigFilePath));
                return {
                    path: path.relative(basePackageLocation, referenceTsConfigPath)
                };
            })
            .filter((r) => Boolean(r)) as ProjectReference[];

        if (options.includesLocal) {
            const referenceInLocal = getReferenceInPackage(tsconfigFilePath);
            newProjectReferences.push(...referenceInLocal);
        }

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
            } catch (error: any) {
                const selfName = relativeName(packageInfo.location);
                errors.push(new Error(`[${selfName}] ${error.message}`));
            }
            return;
        } else {
            // update
            if (errors.length === 0) {
                if (currentProjectReferences.length === 0 && newProjectReferences.length === 0) {
                    // As to not add `references: []` needlessly
                    return;
                }

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
    if (canNotRecoverErrors.length > 0) {
        return {
            ok: false,
            aggregateError: {
                message: `workspaces-to-typescript-project-references found ${canNotRecoverErrors.length} errors.

- ${canNotRecoverErrors.map((error) => error.message.split("\n")[0]).join("\n- ")}

Please resolve these error before updates tsconfig.json
`,
                errors: canNotRecoverErrors
            }
        };
    }
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
        const tsConfigPath = options.tsConfigPath ?? DEFAULT_TSCONFIGPATH;
        return {
            ok: false,
            aggregateError: {
                message: `Not found ${tsConfigPath} in ${rootTsconfigFilePath}`,
                errors
            }
        };
    }
    const tsconfigJSON = commentJSON.parse(fs.readFileSync(rootTsconfigFilePath, "utf-8"));
    const projectReferences = allPackages
        .filter((pkg) => {
            const tsconfigFilePath =
                options.tsConfigPathFinder?.(pkg.location) ?? path.join(pkg.location, DEFAULT_TSCONFIGPATH);
            // Skip if the package has not tsconfig.json
            return fs.existsSync(tsconfigFilePath);
        })
        .map((pkg) => {
            const tsConfigPath = options.tsConfigPath ?? DEFAULT_TSCONFIGPATH;
            const pathComponents = [path.relative(options.rootDir, pkg.location)];
            // If the file name is not tsconfig.json (the default),
            // then append it to the generated path
            const tsConfigFileName = path.basename(tsConfigPath);
            if (tsConfigFileName !== DEFAULT_TSCONFIGPATH) {
                pathComponents.push(tsConfigFileName);
            }
            return {
                path: path.join(...pathComponents)
            };
        });

    if (options.includesLocal) {
        const referenceInLocal = getReferenceInPackage(rootTsconfigFilePath);
        projectReferences.push(...referenceInLocal);
    }

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
        } catch (error: any) {
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
