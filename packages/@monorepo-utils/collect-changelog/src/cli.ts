// MIT © 2018 azu
"use strict";

import * as fs from "fs";

import * as path from "path";
import { findChangelog } from "./collect-changelog-from-tag";
import Handlebars = require("handlebars");

export interface ExecuteOptions {
    directory: string;
    lernaTag: string;
    templatePath?: string;
}

export async function execute(options: ExecuteOptions) {
    const templatePath = options.templatePath
        ? path.resolve(process.cwd(), options.templatePath)
        : path.join(__dirname, "../template/changelog.handlebars");
    const code = fs.readFileSync(templatePath, "utf-8");
    const template = Handlebars.compile(code);
    const changelog = await findChangelog(options.directory, options.lernaTag);
    return template(changelog).trim();
}
