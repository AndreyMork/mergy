// @flow

export type FileObjectType = {|
  content: string,
  ext: string,
|};

export type AvailableFormatsType = 'json' | 'yaml' | 'yml';

export type ParsedValueType = null | string | number | boolean | {} | $ReadOnlyArray<mixed>;

export type MergeConfigsOptionsType = {|
  format: AvailableFormatsType,
|};
