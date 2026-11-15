"use strict";
// Based on https://github.com/azz/get-monorepo-packages
// MIT (c) 2018 Lucas Azzola
import * as fs from "node:fs";
import * as nodePath from "node:path";
import * as yaml from "yaml";

/**
 * Join paths and always use "/" as separator, even on Windows
 */
const joinPath = (...paths: string[]): string => {
    return nodePath.join(...paths).replace(/\\/g, "/");
};

/**
 * Return true if the pattern includes glob special characters
 */
const hasMagic = (pattern: string): boolean => {
    return /[*?[\]{}()!]/.test(pattern);
};

const readJsonFile = (filePath: string): any => {
    const content = fs.readFileSync(filePath, "utf8");
    // strip BOM
    return JSON.parse(content.charCodeAt(0) === 0xfeff ? content.slice(1) : content);
};

const loadPackage = (packagePath: string): object => {
    const pkgJsonPath = joinPath(packagePath, "package.json");
    if (fs.existsSync(pkgJsonPath)) {
        return readJsonFile(pkgJsonPath);
    }
    return {};
};

export const findPackages = (packageSpecs: string[], rootDirectory: string): PackageResult[] => {
    return packageSpecs
        .reduce((pkgDirs, pkgGlob) => {
            const filePathList = hasMagic(pkgGlob)
                ? fs
                      .globSync(pkgGlob, { cwd: rootDirectory })
                      .sort()
                      .map((filePath) => joinPath(rootDirectory, filePath))
                : [joinPath(rootDirectory, pkgGlob)];
            return pkgDirs.concat(filePathList);
        }, [] as string[])
        .map((location: string) => {
            return { location, packageJSON: loadPackage(location) };
        })
        .filter((res) => {
            return res.packageJSON && "name" in res.packageJSON;
        });
};

export interface PackageResult {
    // path to package's directory
    location: string;
    // package.json content
    packageJSON: any;
}

export const getPackages = (rootDirectory: string): PackageResult[] => {
    const pkgJsonPath = joinPath(rootDirectory, "package.json");
    // npm 7+/yarn workspaces support
    if (fs.existsSync(pkgJsonPath)) {
        const pkgJson = readJsonFile(pkgJsonPath);
        const hasWorkspacesInPackageJson = (
            v: any,
        ): v is {
            workspaces: { packages: string[] } | string[];
        } => {
            return "workspaces" in v;
        };
        if (hasWorkspacesInPackageJson(pkgJson)) {
            // "workspaces": []
            if (Array.isArray(pkgJson.workspaces)) {
                return findPackages(pkgJson.workspaces, rootDirectory);
            } else if (Array.isArray(pkgJson.workspaces.packages)) {
                // "workspaces": { "packages": [] }
                return findPackages(pkgJson.workspaces.packages, rootDirectory);
            }
        }
    }

    // pnpm workspaces support
    const pnpmYamlPath = joinPath(rootDirectory, "pnpm-workspace.yaml");
    if (fs.existsSync(pnpmYamlPath)) {
        try {
            const contents = fs.readFileSync(pnpmYamlPath, "utf8");
            const pnpmConfig = yaml.parse(contents);

            if ("packages" in pnpmConfig && Array.isArray(pnpmConfig.packages)) {
                return findPackages(pnpmConfig.packages, rootDirectory);
            }
        } catch (error) {
            return [];
        }
    }

    // legacy lerna(pre workspaces) support
    // lerna 7+ does not have "useWorkspaces" option
    // if non-useWorkspaces and packages is defined, use it
    const lernaJsonPath = joinPath(rootDirectory, "lerna.json");
    // prefer to use yarn workspace instead of lerna.json
    if (fs.existsSync(lernaJsonPath)) {
        const lernaJson = readJsonFile(lernaJsonPath);
        // useWorkspaces is removed in lerna 7
        const hasNotWorkspacesInLernaJson = (v: any): v is { packages: string[] } => {
            return !("useWorkspaces" in v);
        };
        if (hasNotWorkspacesInLernaJson(lernaJson) && lernaJson.packages) {
            return findPackages(lernaJson.packages, rootDirectory);
        }
    }

    // Bail if we don't find any packages
    return [];
};
