import path from "upath";
import fs from "fs";
import { toProjectReferences, toRootProjectReferences } from "../src";

describe("toRootProjectReferences", function () {
    it("update root tsconfig with references to all projects", () => {
        const result = toRootProjectReferences({
            rootDir: path.join(__dirname, "fixtures/root-tsconfig"),
            includesLocal: false,
            checkOnly: true
        });
        expect(result.ok).toBe(true);
    });

    it("respect tsconfigPath", () => {
        const tsConfigPath = "tsconfig.build.json";
        const customTsConfigFinder = (location: string) => {
            return path.join(location, tsConfigPath);
        };
        const result = toRootProjectReferences({
            rootDir: path.join(__dirname, "fixtures/root-tsconfig"),
            includesLocal: false,
            checkOnly: true,
            tsConfigPath,
            tsConfigPathFinder: customTsConfigFinder
        });
        expect(result.ok).toBe(true);
    });

    it("with includesLocal", () => {
        const result = toRootProjectReferences({
            rootDir: path.join(__dirname, "fixtures/local-tsconfig"),
            includesLocal: true,
            checkOnly: true
        });
        expect(result.ok).toBe(true);
    });
});
describe("toProjectReferences", function () {
    it("support lerna.json", () => {
        const result = toProjectReferences({
            rootDir: path.join(__dirname, "fixtures/lerna"),
            includesLocal: false,
            checkOnly: true
        });
        expect(result.ok).toBe(true);
    });
    it("support yarn workspaces", () => {
        const result = toProjectReferences({
            rootDir: path.join(__dirname, "fixtures/yarn-workspaces"),
            includesLocal: false,
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
            includesLocal: false,
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
            includesLocal: false,
            checkOnly: true,
            tsConfigPath: tsconfigPath,
            tsConfigPathFinder: customTsConfigFinder
        });
        expect(result.ok).toBe(true);
    });
    it("support yarn v2 workspaces", () => {
        const result = toProjectReferences({
            rootDir: path.join(__dirname, "fixtures/yarn-v2-workspaces"),
            includesLocal: false,
            checkOnly: true
        });
        expect(result.ok).toBe(true);
    });
    it("does not write if the contents will be the same", () => {
        const rootDir = path.join(__dirname, "fixtures/yarn-workspaces");
        const tsConfigPathA = path.join(rootDir, "packages/a/tsconfig.json");
        const initialMtime = fs.statSync(tsConfigPathA).mtime;
        const result = toProjectReferences({ rootDir, includesLocal: false, checkOnly: false });
        expect(result.ok).toBe(true);
        const newMTime = fs.statSync(tsConfigPathA).mtime;
        expect(newMTime).toEqual(initialMtime);
    });
    it("ok: false when some package has self-dependency", () => {
        const result = toProjectReferences({
            rootDir: path.join(__dirname, "fixtures/error.self-dependency"),
            includesLocal: false,
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
            includesLocal: false,
            checkOnly: true
        });
        expect(result.ok).toBe(false);
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
            includesLocal: false,
            checkOnly: true
        });
        expect(result.ok).toBe(true);
    });
    it("support includesLocal", () => {
        const result = toProjectReferences({
            rootDir: path.join(__dirname, "fixtures/local-tsconfig"),
            includesLocal: true,
            checkOnly: true
        });
        expect(result.ok).toBe(true);
    });
    it("support pnpm workspaces", () => {
        const fixtureDir = path.join(__dirname, "fixtures/pnpm");
        const actualFilePath = path.join(fixtureDir, "packages/a/tsconfig.json");
        const result = toProjectReferences({
            rootDir: fixtureDir,
            checkOnly: false,
            includesLocal: false
        });
        expect(result.ok).toBe(true);
        const actual = fs.readFileSync(actualFilePath, "utf-8");
        expect(actual).toMatchSnapshot();
    });
});
