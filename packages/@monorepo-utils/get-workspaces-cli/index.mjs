#!/usr/bin/env node
import util from "util";
import { getPackages } from "@monorepo-utils/package-utils";

const USAGE = `
Usage: npx @monorepo-utils/get-workspaces-cli [options]

Options:
    --help, -h        Show this help message
    --cwd <path>      Current working directory (default: process.cwd())
    --format <format> Output format (default: line) Supported formats: line, json
    
Examples:
    $ npx @monorepo-utils/get-workspaces-cli
`;

/**
 * $ npx @monorepo-utils/get-workspaces-cli
 */
const parsed = util.parseArgs({
    options: {
        help: {
            type: "boolean",
            alias: "h",
            default: false
        },
        cwd: {
            type: "string",
            default: process.cwd()
        },
        format: {
            type: "string",
            default: "line" // line, json
        }
    }
});
if (parsed.values.help) {
    console.log(USAGE);
    process.exit(0);
}

const packages = getPackages(parsed.values.cwd);
if (parsed.values.format === "json") {
    console.log(JSON.stringify(packages, null, 4));
} else {
    packages.forEach((pkg) => {
        console.log(pkg.location);
    });
}
