import { PackageResult } from "@monorepo-utils/package-utils";

export type Dependencies = {
    [index: string]: string;
};
export type PackageJSON = {
    name: string;
    dependencies?: Dependencies;
    devDependencies?: Dependencies;
};
export type PackageManagerPluginOptions = {
    rootDir: string;
};
export type PackageReference = { name: string; version: undefined | string };
export type PackageManagerPluginImplementation = {
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
export type PackageManagerPlugin = (options: PackageManagerPluginOptions) => PackageManagerPluginImplementation;
