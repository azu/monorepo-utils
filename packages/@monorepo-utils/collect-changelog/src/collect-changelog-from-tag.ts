// MIT © 2017 azu
"use strict";
import * as path from "path";
import * as fs from "fs";
import { getPackages } from "@monorepo-utils/package-utils";

const parse = require("cclog-parser");

interface CclogObject {
    versions: string[];
    changes: ChangesByVersion;
}

interface ChangesByVersion {
    [index: string]: Changes;
}

export type Changes = {
    fixes?: string[];
    features?: string[];
    breakingChanges?: string[];
};

export interface ChangLogResult {
    name: string;
    version: string;
    changes: Changes;
}

function getChangelog(filePath: string) {
    return new Promise<CclogObject>((resolve, reject) => {
        if (!fs.existsSync(filePath)) {
            return reject(new Error(`${filePath} is not found`));
        }
        const content = fs.readFileSync(filePath, "utf-8");
        resolve(parse(content));
    });
}

function getLog(changelogFilePath: string, { name, version }: { name: string; version: string }): Promise<Changes> {
    return getChangelog(changelogFilePath).then((result: CclogObject) => {
        if (!result.changes[version]) {
            throw new Error(`Not found that version: ${name}@${version}`);
        }
        return result.changes[version];
    });
}

function splitLernaTag(lernaTag: string) {
    const splitIndex = lernaTag.lastIndexOf("@");
    return {
        name: lernaTag.slice(0, splitIndex),
        version: lernaTag.slice(splitIndex + 1)
    };
}

function filterEmpty(array?: string[]) {
    if (!array) {
        return [];
    }
    return array.filter(item => item.trim().length !== 0);
}

function filter(changes: Changes) {
    if (filterEmpty(changes.breakingChanges).length === 0) {
        delete changes.breakingChanges;
    }
    if (filterEmpty(changes.features).length === 0) {
        delete changes.features;
    }
    if (filterEmpty(changes.fixes).length) {
        delete changes.fixes;
    }
    return changes;
}

export function convertCClogToResult(name: string, version: string, changes: Changes): ChangLogResult {
    return {
        name,
        version,
        changes: filter(changes)
    };
}

/**
 * Find changelog and return
 * @param projectRootDirectory project root directory that has lerna.json or pacakge.json
 * @param lernaTag package@version string
 */
export function findChangelog(projectRootDirectory: string, lernaTag: string): Promise<ChangLogResult> {
    const meta = splitLernaTag(lernaTag);
    if (!meta.name || !meta.version) {
        throw new Error("It is not lerna tag" + lernaTag);
    }
    const matchPackage = getPackages(projectRootDirectory).find(value => {
        return value.package.name === meta.name;
    });
    if (!matchPackage) {
        throw new Error(`Not found match package: ${meta.name}@${meta.version}`);
    }
    return getLog(`${path.join(matchPackage.location)}/CHANGELOG.md`, meta).then(changes => {
        return convertCClogToResult(meta.name, meta.version, changes);
    });
}
