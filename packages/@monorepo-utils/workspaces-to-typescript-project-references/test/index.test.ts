import path from "path";
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
