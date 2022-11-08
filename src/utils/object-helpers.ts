
export const updateObjectInArray = <T extends {}, K extends keyof T, P extends Partial<T>>
(arr: Array<T>, value: T[K], key: K, newObjProps: P):Array<T> =>
    arr.map(obj => obj[key] === value ? {...obj, ...newObjProps} : obj);