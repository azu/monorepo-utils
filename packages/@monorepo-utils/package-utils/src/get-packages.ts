"use strict";

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
            return { location, package: loadPackage(location) };
        })
        .filter(res => {
            return res.package && res.package.name;
        });
};

export const getPackages = (directory: string) => {
    const lernaJsonPath = path.join(directory, "lerna.json");
    if (fs.existsSync(lernaJsonPath)) {
        const lernaJson = loadJsonFile.sync(lernaJsonPath);
        if (!lernaJson.useWorkspaces) {
            return findPackages(lernaJson.packages, directory);
        }
    }

    const pkgJsonPath = path.join(directory, "package.json");
    if (fs.existsSync(pkgJsonPath)) {
        const pkgJson = loadJsonFile.sync(pkgJsonPath);
        if (pkgJson.workspaces) {
            // "workspaces": []
            if (Array.isArray(pkgJson.workspaces)) {
                return findPackages(pkgJson.workspaces, directory);
            } else if (Array.isArray(pkgJson.workspaces.packages)) {
                // "workspaces": { "packages": [] }
                return findPackages(pkgJson.workspaces.packages, directory);
            }
        }
    }

    // Bail if we don't find any packages
    return [];
};
