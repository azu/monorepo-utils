import { PackageManagerPlugin } from "./PackageManagerPlugin";
import { plugin as npmPlugin } from "./npm";

/**
 * Currently, use same logic for yarn
 */
export const plugin: PackageManagerPlugin = npmPlugin;
