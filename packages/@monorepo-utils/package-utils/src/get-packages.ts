"use strict";
// Based on https://github.com/azz/get-monorepo-packages
// MIT (c) 2018 Lucas Azzola
const globby = require("globby");
import loadJsonFile = require("load-json-file");
import * as path from "upath";
import * as fs from "fs";
import * as yaml from "yaml";

const loadPackage = (packagePath: string): object => {
    const pkgJsonPath = path.join(packagePath, "package.json");
    if (fs.existsSync(pkgJsonPath)) {
        return loadJsonFile.sync(pkgJsonPath);
    }
    return {};
};

export const findPackages = (packageSpecs: string[], rootDirectory: string): PackageResult[] => {
    return packageSpecs
        .reduce((pkgDirs, pkgGlob) => {
            const target = path.join(rootDirectory, pkgGlob);
            const filePathList = globby.hasMagic(pkgGlob)
                ? globby.sync(target, {
                      onlyFiles: false,
                  })
                : [target];
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
    const pkgJsonPath = path.join(rootDirectory, "package.json");
    // npm 7+/yarn workspaces support
    if (fs.existsSync(pkgJsonPath)) {
        const pkgJson = loadJsonFile.sync(pkgJsonPath);
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
    const pnpmYamlPath = path.join(rootDirectory, "pnpm-workspace.yaml");
    if (fs.existsSync(pnpmYamlPath)) {
        const contents = fs.readFileSync(pnpmYamlPath, "utf8");
        const pnpmConfig = yaml.parse(contents);

        if ("packages" in pnpmConfig && Array.isArray(pnpmConfig.packages)) {
            return findPackages(pnpmConfig.packages, rootDirectory);
        }
    }

    // legacy lerna(pre workspaces) support
    // leran 7+ does not have "useWorkspaces" option
    // if non-useWorkspaces and packages is defined, use it
    const lernaJsonPath = path.join(rootDirectory, "lerna.json");
    // prefer to use yarn workspace instead of lerna.json
    if (fs.existsSync(lernaJsonPath)) {
        const lernaJson = loadJsonFile.sync(lernaJsonPath);
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
