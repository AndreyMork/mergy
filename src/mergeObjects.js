// @flow

import { union, isObject } from './utils';


const bothAreObjects = (a: mixed, b: mixed): boolean %checks => isObject(a) && isObject(b);
const bothAreArrays = (a: mixed, b: mixed): boolean %checks => Array.isArray(a) && Array.isArray(b);
const oneIsUndefined = (a: mixed, b: mixed): boolean %checks => a === undefined || b === undefined;

const mergeTwoObjects = (obj1: {}, obj2: {}): {} => {
  const mergeValues = (a: mixed, b: mixed): mixed => {
    if (bothAreObjects(a, b)) {
      return mergeTwoObjects(a, b);
    }

    if (bothAreArrays(a, b)) {
      return [...a, ...b];
    }

    if (oneIsUndefined(a, b)) {
      return a !== undefined ? a : b;
    }

    throw new TypeError(`Can't merge ${typeof a} and ${typeof b}`);
  };

  const obj1Keys: Set<string> = new Set(Object.keys(obj1));
  const obj2Keys: Set<string> = new Set(Object.keys(obj2));
  const keys: Set<string> = union(obj1Keys, obj2Keys);

  return [...keys].reduce((acc: {}, key: string): {} => {
    const value1: mixed = obj1[key];
    const value2: mixed = obj2[key];

    return { ...acc, [key]: mergeValues(value1, value2) };
  }, {});
};

export default (...arrayOfObjects: $ReadOnlyArray<{}>): {} => arrayOfObjects.reduce((acc: {}, obj: {}): {} => mergeTwoObjects(acc, obj), {});
