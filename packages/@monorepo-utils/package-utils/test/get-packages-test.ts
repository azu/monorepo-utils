import * as path from "path";
import { getPackages } from "../src";

expect.addSnapshotSerializer({
    test: value => typeof value === "string" && (value.indexOf("\\") > -1 || value.indexOf(process.cwd()) > -1),
    print: (value, serializer) => serializer(value.replace(process.cwd(), "<cwd>").replace(/\\/g, "/"))
});

describe("getPackages", () => {
    it("should match lerna.json", () => {
        const LERNA_PATH = path.join(__dirname, "fixtures/lerna");
        expect(getPackages(LERNA_PATH)).toMatchInlineSnapshot(`
Array [
  Object {
    "location": "<cwd>/test/fixtures/lerna/packages/bar",
    "package": Object {
      "name": "bar",
    },
  },
  Object {
    "location": "<cwd>/test/fixtures/lerna/packages/foo",
    "package": Object {
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
    "package": Object {
      "name": "bar",
      "version": "0.0.0",
    },
  },
  Object {
    "location": "<cwd>/test/fixtures/yarn-workspaces-old/packages/foo",
    "package": Object {
      "name": "foo",
      "version": "0.0.0",
    },
  },
  Object {
    "location": "<cwd>/test/fixtures/yarn-workspaces-old/package-2",
    "package": Object {
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
    "package": Object {
      "name": "bar",
      "version": "0.0.0",
    },
  },
  Object {
    "location": "<cwd>/test/fixtures/yarn-workspaces-new/packages/foo",
    "package": Object {
      "name": "foo",
      "version": "0.0.0",
    },
  },
  Object {
    "location": "<cwd>/test/fixtures/yarn-workspaces-new/package-2",
    "package": Object {
      "name": "package-2",
      "version": "0.0.0",
    },
  },
]
`);
    });
});
