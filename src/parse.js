// @flow

import { safeLoad } from 'js-yaml';

import type { FileObjectType, ParsedValueType } from './types/index.types';


type ParseSig = string => ParsedValueType;
const parsers: { +[string]: ParseSig } = {
  '.json': JSON.parse,
  '.yaml': safeLoad,
  '.yml': safeLoad,
};

export default (fileObject: FileObjectType): ParsedValueType => {
  const { content, ext }: FileObjectType = fileObject;

  const parse: ParseSig = parsers[ext];
  if (parse == null) {
    throw new Error(`Extension '${ext}' is not supported`);
  }

  return parse(content);
};
