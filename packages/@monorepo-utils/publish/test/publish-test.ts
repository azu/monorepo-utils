import * as path from "path";
import { publish } from "../src/publish";

const stripAnsi = require("strip-ansi");
const makeConsoleMock = require("consolemock");
describe("publish", () => {
    let consoleMock: any;
    let originalConsole: any;
    beforeEach(() => {
        consoleMock = makeConsoleMock(console);
        originalConsole = global.console;
        global.console = consoleMock;
    });
    afterEach(() => {
        global.console = originalConsole;
    });
    it("should publish packages", async () => {
        await publish({
            projectDir: path.join(__dirname, "fixtures"),
            skipPrompt: true,
            dry: true,
            ciMode: true
        });
        expect(stripAnsi(consoleMock.printHistory())).toMatchSnapshot();
    });
    it("should publish packages with --distTag", async () => {
        await publish({
            projectDir: path.join(__dirname, "fixtures"),
            skipPrompt: true,
            dry: true,
            ciMode: true,
            distTag: "next"
        });
        expect(stripAnsi(consoleMock.printHistory())).toMatchSnapshot();
    });
});
