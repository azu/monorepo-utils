import path from "upath";
import { toProjectReferences } from "../src";

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
});
