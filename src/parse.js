// @flow

import { safeLoad } from 'js-yaml';

import type { AvailableFormatsType } from './types/index.types';


type ParseSig = string => mixed;
const parsers: { +[AvailableFormatsType]: ParseSig } = {
  json: JSON.parse,
  yaml: safeLoad,
};

type OptionsType = {|
  content: string,
  format: AvailableFormatsType,
|};
export default ({ content, format }: OptionsType): mixed => {
  const parse: ?ParseSig = parsers[format];
  if (parse == null) {
    throw new Error(`Unknown format ${format}`);
  }

  return parse(content);
};
