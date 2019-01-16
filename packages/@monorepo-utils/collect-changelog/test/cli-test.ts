import * as path from "path";
import { execute } from "../src/cli";

const fixturesDir = path.join(__dirname, "fixtures");
describe("cli", () => {
    it("textlint@10.2.0 should has changelog ", async () => {
        const actual = await execute({
            directory: fixturesDir,
            lernaTag: "textlint@10.2.0"
        });
        expect(actual).toMatchSnapshot();
    });
    it("@textlint/kernel@2.0.0-next. should has changelog ", async () => {
        const actual = await execute({
            directory: fixturesDir,
            lernaTag: "@textlint/kernel@2.0.0-next.0"
        });
        expect(actual).toMatchSnapshot();
    });
    it("@textlint/ast-tester@2.0.7 should be empty ", async () => {
        const actual = await execute({
            directory: fixturesDir,
            lernaTag: "@textlint/ast-tester@2.0.7"
        });
        expect(actual).toBe("");
    });
});
