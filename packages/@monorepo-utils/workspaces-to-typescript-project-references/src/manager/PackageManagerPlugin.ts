import { PackageResult } from "@monorepo-utils/package-utils";

export type PackageManagerPluginOptions = {
    rootDir: string;
};
export type PackageReference = {
    name: string;
};
export type PackageManagerPluginImplementation = {
    /**
     * Return true if support the project
     */
    supports(): boolean;
    /**
     * Return monorepo packages
     */
    getAllPackages(): PackageResult[];
    /**
     * Return PackageReference of the package
     * @param pkgResult
     */
    getDependencies(pkgResult: PackageResult): PackageReference[];
    /**
     * If can resolve it, return absolute path.
     * If can not resolve it, return null.
     */
    resolve(reference: PackageReference): string | null;
};
/**
 * Plugin should implement this interface and export it as `plugin`
 * @example
 * ```ts
 * export const plugin: PackageManagerPlugin = () => { ...your plugin implementation... }
 * ```
 */
export type PackageManagerPlugin = (options: PackageManagerPluginOptions) => PackageManagerPluginImplementation;
