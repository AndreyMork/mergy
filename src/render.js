// @flow

import yaml from 'js-yaml';

import type { AvailableFormatsType } from './types/index.types';


type RenderSig = ({}) => string;
const renders: { +[AvailableFormatsType]: RenderSig } = {
  json: (value: {}): string => JSON.stringify(value, null, 2),
  yaml: yaml.safeDump,
};

type OptionsType = {| value: {}, format: AvailableFormatsType |};
export default ({ value, format }: OptionsType): string => {
  const render: ?RenderSig = renders[format];
  if (render == null) {
    throw new Error(`Unknown format ${format}`);
  }

  return render(value);
};
