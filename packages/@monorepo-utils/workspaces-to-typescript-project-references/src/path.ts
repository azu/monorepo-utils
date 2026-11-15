import nodePath from "node:path";

/**
 * Convert Windows path separator "\" to "/"
 */
const toUnix = (filePath: string): string => filePath.replace(/\\/g, "/");

/**
 * Wrapper of node:path that always returns "/" separated paths, even on Windows.
 * tsconfig.json references should use "/" as path separator.
 */
const path = {
    join: (...paths: string[]): string => toUnix(nodePath.join(...paths)),
    resolve: (...paths: string[]): string => toUnix(nodePath.resolve(...paths)),
    relative: (from: string, to: string): string => toUnix(nodePath.relative(from, to)),
    dirname: (filePath: string): string => toUnix(nodePath.dirname(filePath)),
    basename: (filePath: string, suffix?: string): string => nodePath.basename(filePath, suffix),
    isAbsolute: (filePath: string): boolean => nodePath.isAbsolute(filePath)
};

export default path;
