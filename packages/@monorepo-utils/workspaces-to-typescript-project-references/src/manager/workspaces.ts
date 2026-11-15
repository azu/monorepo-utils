import semver from "semver";
import { PackageManagerPlugin, PackageReference } from "./PackageManagerPlugin";
import { getPackages } from "@monorepo-utils/package-utils";
import { PackageResult } from "@monorepo-utils/package-utils";

export const plugin: PackageManagerPlugin = (options) => {
    // getPackages support "workspaces" and lerna.json
    const monorepoPackages = getPackages(options.rootDir);
    return {
        supports(): boolean {
            return monorepoPackages.length > 0;
        },
        getAllPackages(): PackageResult[] {
            return monorepoPackages;
        },
        getDependencies(packageJSON: PackageResult["packageJSON"]): PackageReference[] {
            const dependencies = Object.entries(packageJSON.dependencies ?? {});
            const devDependencies = Object.entries(packageJSON.devDependencies ?? {});
            return [...dependencies, ...devDependencies].map((dep) => {
                return {
                    name: dep[0] as string,
                    version: dep[1] as string
                };
            });
        },
        resolve({ name, version }): string | null {
            const matchPkg = monorepoPackages.find((info) => {
                if (info.packageJSON.name !== name) return false;
                if (version.startsWith("workspace:")) return true;
                if (version === "*") return true;
                // version is a range like "^1.0.0". if it is not a range(e.g. a tag), it does not match
                return semver.validRange(version) !== null && semver.satisfies(info.packageJSON.version, version);
            });
            if (!matchPkg) {
                return null;
            }
            return matchPkg.location;
        }
    };
};
