"use strict";
// Based on https://github.com/azz/get-monorepo-packages
// MIT (c) 2018 Lucas Azzola
const globby = require("globby");
import loadJsonFile = require("load-json-file");
import * as path from "path";
import * as fs from "fs";

const loadPackage = (packagePath: string) => {
    const pkgJsonPath = path.join(packagePath, "package.json");
    if (fs.existsSync(pkgJsonPath)) {
        return loadJsonFile.sync(pkgJsonPath);
    }
};

const findPackages = (packageSpecs: string[], rootDirectory: string) => {
    return packageSpecs
        .reduce(
            (pkgDirs, pkgGlob) => {
                const target = path.join(rootDirectory, pkgGlob);
                const filePathList = globby.hasMagic(pkgGlob)
                    ? globby.sync(target, {
                          onlyFiles: false
                      })
                    : [target];
                return pkgDirs.concat(filePathList);
            },
            [] as string[]
        )
        .map((location: string) => {
            return { location, packageJSON: loadPackage(location) };
        })
        .filter(res => {
            return res.packageJSON && res.packageJSON.name;
        });
};

export interface PackageResult {
    // path to package's directory
    location: string;
    // package.json content
    packageJSON: any;
}

export const getPackages = (rootDirectory: string): PackageResult[] => {
    const lernaJsonPath = path.join(rootDirectory, "lerna.json");
    // prefer to use yarn workspace instead of lerna.json
    if (fs.existsSync(lernaJsonPath)) {
        const lernaJson = loadJsonFile.sync(lernaJsonPath);
        if (!lernaJson.useWorkspaces) {
            return findPackages(lernaJson.packages, rootDirectory);
        }
    }

    const pkgJsonPath = path.join(rootDirectory, "package.json");
    if (fs.existsSync(pkgJsonPath)) {
        const pkgJson = loadJsonFile.sync(pkgJsonPath);
        if (pkgJson.workspaces) {
            // "workspaces": []
            if (Array.isArray(pkgJson.workspaces)) {
                return findPackages(pkgJson.workspaces, rootDirectory);
            } else if (Array.isArray(pkgJson.workspaces.packages)) {
                // "workspaces": { "packages": [] }
                return findPackages(pkgJson.workspaces.packages, rootDirectory);
            }
        }
    }

    // Bail if we don't find any packages
    return [];
};
