import * as path from "path";
import { execute } from "../src/cli";

const independentDir = path.join(__dirname, "fixtures/independent");
const fixedDir = path.join(__dirname, "fixtures/fixed");
describe("cli", () => {
    describe("when fixed mode", () => {
        it("get 0.13.0 from CHANGELOG.md", async () => {
            const actual = await execute({
                directory: fixedDir,
                changelogFilePath: path.join(fixedDir, "CHANGELOG.md"),
                tag: "0.13.0",
            });
            expect(actual).toMatchSnapshot();
        });
    });
    describe("when independent mode", () => {
        it("textlint@10.2.0 should has changelog ", async () => {
            const actual = await execute({
                directory: independentDir,
                tag: "textlint@10.2.0",
            });
            expect(actual).toMatchSnapshot();
        });
        it("@textlint/kernel@2.0.0-next. should has changelog ", async () => {
            const actual = await execute({
                directory: independentDir,
                tag: "@textlint/kernel@2.0.0-next.0",
            });
            expect(actual).toMatchSnapshot();
        });
        it("@textlint/ast-tester@2.0.7 should be empty ", async () => {
            const actual = await execute({
                directory: independentDir,
                tag: "@textlint/ast-tester@2.0.7",
            });
            expect(actual).toBe("");
        });
    });
});
