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
                    name: dep[0] as string
                };
            });
        },
        resolve({ name }): string | null {
            const matchPkg = monorepoPackages.find((info) => {
                return info.packageJSON.name === name;
            });
            if (!matchPkg) {
                return null;
            }
            return matchPkg.location;
        }
    };
};
