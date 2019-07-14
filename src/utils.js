// @flow

const union = <A, B>(set1: Set<A>, set2: Set<B>): Set<A | B> => new Set([...set1, ...set2]);

const isSimpleObject = (value: mixed): boolean %checks =>
  value instanceof Object && value.constructor === Object;

const getType = (x: mixed): string => {
  if (typeof x !== 'object') {
    return typeof x;
  }

  if (x === null) {
    return 'null';
  }

  if (x.constructor === Object) {
    return 'object';
  }

  return x.constructor.name;
};

export { union, getType, isSimpleObject };
