import path from "upath";
import fs from "fs";
import { toProjectReferences, toRootProjectReferences } from "../src";

describe("toRootProjectReferences", function () {
    it("support lerna.json", () => {
        const result = toRootProjectReferences({
            rootDir: path.join(__dirname, "fixtures/root-tsconfig"),
            checkOnly: true
        });
        expect(result.ok).toBe(true);
    });
});
describe("toProjectReferences", function () {
    it("support lerna.json", () => {
        const result = toProjectReferences({
            rootDir: path.join(__dirname, "fixtures/lerna"),
            checkOnly: true
        });
        expect(result.ok).toBe(true);
    });
    it("support yarn workspaces", () => {
        const result = toProjectReferences({
            rootDir: path.join(__dirname, "fixtures/yarn-workspaces"),
            checkOnly: true
        });
        expect(result.ok).toBe(true);
    });
    it("support yarn workspaces with tsConfigPath", () => {
        const tsconfigPath = "src/tsconfig.json";
        const customTsConfigFinder = (location: string) => {
            return path.join(location, tsconfigPath);
        };
        const result = toProjectReferences({
            rootDir: path.join(__dirname, "fixtures/yarn-workspaces-src-subdir"),
            checkOnly: true,
            tsConfigPath: tsconfigPath,
            tsConfigPathFinder: customTsConfigFinder
        });
        expect(result.ok).toBe(true);
    });
    it("support yarn workspaces with tsConfigPath with filename that is not tsconfig.json", () => {
        const tsconfigPath = "src/tsconfig-esm.json";
        const customTsConfigFinder = (location: string) => {
            return path.join(location, tsconfigPath);
        };
        const result = toProjectReferences({
            rootDir: path.join(__dirname, "fixtures/yarn-workspaces-tsconfigPath"),
            checkOnly: true,
            tsConfigPath: tsconfigPath,
            tsConfigPathFinder: customTsConfigFinder
        });
        expect(result.ok).toBe(true);
    });
    it("support yarn v2 workspaces", () => {
        const result = toProjectReferences({
            rootDir: path.join(__dirname, "fixtures/yarn-v2-workspaces"),
            checkOnly: true
        });
        expect(result.ok).toBe(true);
    });
    it("does not write if the contents will be the same", () => {
        const rootDir = path.join(__dirname, "fixtures/yarn-workspaces");
        const tsConfigPathA = path.join(rootDir, "packages/a/tsconfig.json");
        const initialMtime = fs.statSync(tsConfigPathA).mtime;
        const result = toProjectReferences({ rootDir, checkOnly: false });
        expect(result.ok).toBe(true);
        const newMTime = fs.statSync(tsConfigPathA).mtime;
        expect(newMTime).toEqual(initialMtime);
    });
    it("ok: false when some package has self-dependency", () => {
        const result = toProjectReferences({
            rootDir: path.join(__dirname, "fixtures/error.self-dependency"),
            checkOnly: true
        });
        expect(result.ok).toBe(false);
        expect(result.aggregateError?.message).toMatchInlineSnapshot(`
            "workspaces-to-typescript-project-references found 2 errors.

            Please update your tsconfig.json via following command.

            $ workspaces-to-typescript-project-references
            "
        `);
    });
    it("ok: false when a same package in `dependencies` and `devDependencies`", () => {
        const result = toProjectReferences({
            rootDir: path.join(__dirname, "fixtures/error.invalid-dependencies"),
            checkOnly: true
        });
        expect(result.ok).toBe(false);
        console.log("result.aggregateError?.message", result.aggregateError?.message);
        expect(result.aggregateError?.message).toMatchInlineSnapshot(`
            "workspaces-to-typescript-project-references found 1 errors.

            - This package is deduplicated in dependencies and devDependencies: @example/invalid

            Please resolve these error before updates tsconfig.json
            "
        `);
    });
    it("should not includes non-ts package", () => {
        const result = toProjectReferences({
            rootDir: path.join(__dirname, "fixtures/js-ts-mixed-packages"),
            checkOnly: true
        });
        expect(result.ok).toBe(true);
    });
});
