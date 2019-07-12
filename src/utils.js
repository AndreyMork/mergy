// @flow

const union = <A, B>(set1: Set<A>, set2: Set<B>): Set<A | B> => new Set([...set1, ...set2]);

const isObject = (value: mixed): boolean %checks =>
  value instanceof Object && !Array.isArray(value) && value !== null;

export { union, isObject };
