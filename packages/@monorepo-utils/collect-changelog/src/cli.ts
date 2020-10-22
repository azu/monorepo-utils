// MIT © 2018 azu
"use strict";

import * as fs from "fs";

import * as path from "upath";
import { findChangelog, getChangelog } from "./collect-changelog-from-tag";
import Handlebars = require("handlebars");

export interface ExecuteOptions {
    directory: string;
    changelogFilePath?: string;
    name?: string;
    tag: string;
    templatePath?: string;
}

export async function execute(options: ExecuteOptions) {
    const templatePath = options.templatePath
        ? path.resolve(process.cwd(), options.templatePath)
        : path.join(__dirname, "../template/changelog.handlebars");
    const code = fs.readFileSync(templatePath, "utf-8");
    const template = Handlebars.compile(code);
    if (options.changelogFilePath) {
        const changelog = await getChangelog(options.changelogFilePath, {
            name: options.name ?? "package", // no name
            version: options.tag,
        });
        return template(changelog).trim();
    } else {
        const changelog = await findChangelog(options.directory, options.tag);
        return template(changelog).trim();
    }
}
