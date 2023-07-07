import * as path from "upath";
import { findChangelog } from "../src/collect-changelog-from-tag";
describe("collect-changelog-from-tag", () => {
    it("should match package@version", async () => {
        const fixtures = path.join(__dirname, "fixtures/independent");
        const change = await findChangelog(fixtures, "textlint@10.2.0");
        expect(change).toMatchInlineSnapshot(`
            {
              "changes": {
                "features": [
                  "**textlint:** support --no-textlintrc ([466e257](https://github.com/textlint/textlint/commit/466e257))",
                  "**textlint:** add tests for --no-textlintrc ([289deb3](https://github.com/textlint/textlint/commit/289deb3))",
                  "**textlint:** pass textlintrc options for failure tests ([bc0804d](https://github.com/textlint/textlint/commit/bc0804d))",
                  "**textlint:** simplify textlint --help test ([0d2114d](https://github.com/textlint/textlint/commit/0d2114d))",
                ],
                "fixes": [
                  "**textlint:** check textlintrc option exists for internal use ([744da23](https://github.com/textlint/textlint/commit/744da23))",
                ],
              },
              "hasChanges": true,
              "name": "textlint",
              "version": "10.2.0",
            }
        `);
    });
    it("should match @scope/package@version", async () => {
        const fixtures = path.join(__dirname, "fixtures/independent");
        const change = await findChangelog(fixtures, "@textlint/linter-formatter@3.0.0");
        expect(change).toMatchInlineSnapshot(`
            {
              "changes": {
                "breakingChanges": [
                  "**textlint-formatter:** export \`{ createFormatter }\` instead of \`{ default }\`",
                ],
                "features": [
                  "**textlint-formatter:** add getFormatterList function ([25e1113](https://github.com/textlint/textlint/commit/25e1113))",
                  "**textlint-formatter:** add new option to cli ([30351a8](https://github.com/textlint/textlint/commit/30351a8))",
                ],
                "fixes": [
                  "**textlint-formatter:** define \`TextLintFormatterOption\` interface ([31146c7](https://github.com/textlint/textlint/commit/31146c7))",
                  "**textlint-formatter:** run all tests ([6d507c2](https://github.com/textlint/textlint/commit/6d507c2)), closes [#402](https://github.com/textlint/textlint/issues/402)",
                  "**textlint-formatter:** Update API ([8f4901f](https://github.com/textlint/textlint/commit/8f4901f))",
                ],
              },
              "hasChanges": true,
              "name": "@textlint/linter-formatter",
              "version": "3.0.0",
            }
        `);
    });
});
