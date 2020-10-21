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
Array [
  Object {
    "location": "<cwd>/test/fixtures/lerna/packages/bar",
    "packageJSON": Object {
      "name": "bar",
    },
  },
  Object {
    "location": "<cwd>/test/fixtures/lerna/packages/foo",
    "packageJSON": Object {
      "name": "foo",
    },
  },
]
`);
    });
    it("should match yarn-workspaces-old in package.json", () => {
        const YARN_OLD_PATH = path.join(__dirname, "fixtures/yarn-workspaces-old");
        expect(getPackages(YARN_OLD_PATH)).toMatchInlineSnapshot(`
Array [
  Object {
    "location": "<cwd>/test/fixtures/yarn-workspaces-old/packages/bar",
    "packageJSON": Object {
      "name": "bar",
      "version": "0.0.0",
    },
  },
  Object {
    "location": "<cwd>/test/fixtures/yarn-workspaces-old/packages/foo",
    "packageJSON": Object {
      "name": "foo",
      "version": "0.0.0",
    },
  },
  Object {
    "location": "<cwd>/test/fixtures/yarn-workspaces-old/package-2",
    "packageJSON": Object {
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
Array [
  Object {
    "location": "<cwd>/test/fixtures/yarn-workspaces-new/packages/bar",
    "packageJSON": Object {
      "name": "bar",
      "version": "0.0.0",
    },
  },
  Object {
    "location": "<cwd>/test/fixtures/yarn-workspaces-new/packages/foo",
    "packageJSON": Object {
      "name": "foo",
      "version": "0.0.0",
    },
  },
  Object {
    "location": "<cwd>/test/fixtures/yarn-workspaces-new/package-2",
    "packageJSON": Object {
      "name": "package-2",
      "version": "0.0.0",
    },
  },
]
`);
    });
});
