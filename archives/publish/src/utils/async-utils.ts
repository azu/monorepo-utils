"use strict";
export const asyncMap = async function asyncMap<T, R>(array: T[], operation: (item: T) => Promise<R>) {
    return Promise.all(array.map(async (item) => await operation(item)));
};

export const asyncFilter = async <T>(array: T[], predicate: (item: T) => Promise<boolean>) => {
    const evaluateds = await asyncMap(array, async (item) => {
        const shouldExist = await predicate(item);
        return {
            item,
            shouldExist
        };
    });
    return evaluateds.filter((evaluated) => evaluated.shouldExist).map((evaluated) => evaluated.item);
};
