// MIT © 2018 azu
"use strict";

import * as fs from "fs";

import * as path from "path";
import { findChangelog } from "./collect-changelog-from-tag";
import Handlebars = require("handlebars");

export async function execute(directory: string, lernaTag: string) {
    const code = fs.readFileSync(path.join(__dirname, "../template/changelog.handlebars"), "utf-8");
    const template = Handlebars.compile(code);
    const changelog = await findChangelog(directory, lernaTag);
    return template(changelog);
}
