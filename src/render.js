// @flow

import yaml from 'js-yaml';

import type { AvailableFormatsType, ParsedValueType } from './types/index.types';


type RenderSig = ParsedValueType => string;
const renders: { +[AvailableFormatsType]: RenderSig } = {
  json: (value: ParsedValueType): string => JSON.stringify(value, null, 2),
  yaml: yaml.safeDump,
  yml: yaml.safeDump,
};

export default (value: ParsedValueType, type: AvailableFormatsType): string => {
  const render: RenderSig = renders[type];
  return render(value);
};
