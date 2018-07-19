"use strict";

const fs = require("fs");
const path = require("path");
const globby = require("globby");
const loadJsonFile = require("load-json-file");

const loadPackage = packagePath => {
    const pkgJsonPath = path.join(packagePath, "package.json");
    if (fs.existsSync(pkgJsonPath)) {
        return loadJsonFile.sync(pkgJsonPath);
    }
};

const findPackages = (packageSpecs, rootDirectory) => {
    return packageSpecs
        .reduce(
            (pkgDirs, pkgGlob) => [
                ...pkgDirs,
                ...(globby.hasMagic(pkgGlob)
                    ? globby.sync(path.join(rootDirectory, pkgGlob), {
                          nodir: false
                      })
                    : [path.join(rootDirectory, pkgGlob)])
            ],
            []
        )
        .map(location => ({ location, package: loadPackage(location) }))
        .filter(({ package: { name } = {} }) => name);
};

const getPackages = directory => {
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
            if (Array.isArray(pkgJson.workspaces)) {
                return findPackages(pkgJson.workspaces, directory);
            } else if (Array.isArray(pkgJson.workspaces.packages)) {
                return findPackages(pkgJson.workspaces.packages, directory);
            }
            throw new Error('"workspaces" field is invalid format in pacakge.json');
        }
    }

    // Bail if we don't find any packages
    return [];
};

module.exports = getPackages;
exports.default = getPackages;
