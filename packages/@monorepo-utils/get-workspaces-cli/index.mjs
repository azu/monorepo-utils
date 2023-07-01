#!/usr/bin/env node
import util from "util";
import { getPackages } from "@monorepo-utils/package-utils";

const USAGE = `
Usage: npx @monorepo-utils/get-workspaces-cli [options]

Options:
    --help, -h        Show this help message
    --cwd <path>      Current working directory (default: process.cwd())
    --format <format> Output format (default: line) Supported formats: line, json
    --filter <filter> Filter packages by package's name (default: undefined)
    
Examples:
    $ npx @monorepo-utils/get-workspaces-cli
    # Filter packages by package's name
    $ npx @monorepo-utils/get-workspaces-cli --filter example-name
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
        },
        filter: {
            type: "string",
            default: undefined
        }
    }
});
if (parsed.values.help) {
    console.log(USAGE);
    process.exit(0);
}

const packages = getPackages(parsed.values.cwd);
const filteredPackages = packages.filter((pkg) => {
    if (parsed.values.filter) {
        return pkg.packageJSON.name.includes(parsed.values.filter);
    }
    return true;
});
if (parsed.values.format === "json") {
    console.log(JSON.stringify(filteredPackages, null, 4));
} else {
    filteredPackages.forEach((pkg) => {
        console.log(pkg.location);
    });
}
