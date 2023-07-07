import * as path from "upath";
import { getPackages } from "../src";

expect.addSnapshotSerializer({
    test: (value) => typeof value === "string" && (value.indexOf("\\") > -1 || value.indexOf(process.cwd()) > -1),
    // @ts-ignore
    print: (value: string, serializer: (val: string) => string) => {
        return serializer(value.replace(process.cwd(), "<cwd>").replace(/\\/g, "/"));
    },
});

describe("getPackages", () => {
    it("should match lerna.json", () => {
        const LERNA_PATH = path.join(__dirname, "fixtures/lerna");
        expect(getPackages(LERNA_PATH)).toMatchInlineSnapshot(`
            [
              {
                "location": "<cwd>/test/fixtures/lerna/packages/bar",
                "packageJSON": {
                  "name": "bar",
                },
              },
              {
                "location": "<cwd>/test/fixtures/lerna/packages/foo",
                "packageJSON": {
                  "name": "foo",
                },
              },
            ]
        `);
    });
    it("should match package.json rather than lerna.sjon", () => {
        const LERNA_PATH = path.join(__dirname, "fixtures/lerna-and-packages");
        expect(getPackages(LERNA_PATH)).toMatchInlineSnapshot(`
            [
              {
                "location": "<cwd>/test/fixtures/lerna-and-packages/packages/bar",
                "packageJSON": {
                  "name": "bar",
                },
              },
              {
                "location": "<cwd>/test/fixtures/lerna-and-packages/packages/foo",
                "packageJSON": {
                  "name": "foo",
                },
              },
            ]
        `);
    });
    it("should match yarn-workspaces-old in package.json", () => {
        const YARN_OLD_PATH = path.join(__dirname, "fixtures/yarn-workspaces-old");
        expect(getPackages(YARN_OLD_PATH)).toMatchInlineSnapshot(`
            [
              {
                "location": "<cwd>/test/fixtures/yarn-workspaces-old/packages/bar",
                "packageJSON": {
                  "name": "bar",
                  "version": "0.0.0",
                },
              },
              {
                "location": "<cwd>/test/fixtures/yarn-workspaces-old/packages/foo",
                "packageJSON": {
                  "name": "foo",
                  "version": "0.0.0",
                },
              },
              {
                "location": "<cwd>/test/fixtures/yarn-workspaces-old/package-2",
                "packageJSON": {
                  "name": "package-2",
                  "version": "0.0.0",
                },
              },
            ]
        `);
    });
    it("should match yarn-workspaces-new in package.json", () => {
        const YARN_NEW_PATH = path.join(__dirname, "fixtures/yarn-workspaces-new");
        expect(getPackages(YARN_NEW_PATH)).toMatchInlineSnapshot(`
            [
              {
                "location": "<cwd>/test/fixtures/yarn-workspaces-new/packages/bar",
                "packageJSON": {
                  "name": "bar",
                  "version": "0.0.0",
                },
              },
              {
                "location": "<cwd>/test/fixtures/yarn-workspaces-new/packages/foo",
                "packageJSON": {
                  "name": "foo",
                  "version": "0.0.0",
                },
              },
              {
                "location": "<cwd>/test/fixtures/yarn-workspaces-new/package-2",
                "packageJSON": {
                  "name": "package-2",
                  "version": "0.0.0",
                },
              },
            ]
        `);
    });
    it("should support PNPM workspaces via the pnpm-workspace.yaml file", () => {
        const LERNA_PATH = path.join(__dirname, "fixtures/pnpm");
        expect(getPackages(LERNA_PATH)).toMatchInlineSnapshot(`
            [
              {
                "location": "<cwd>/test/fixtures/pnpm/packages/bar",
                "packageJSON": {
                  "name": "bar",
                },
              },
              {
                "location": "<cwd>/test/fixtures/pnpm/packages/foo",
                "packageJSON": {
                  "name": "foo",
                },
              },
            ]
        `);
    });
});
