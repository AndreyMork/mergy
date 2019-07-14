// @flow

export type AvailableFormatsType = 'json' | 'yaml';

export type FileObjectType = {|
  content: string,
  format: AvailableFormatsType,
|};

export type MergyOptionsType = {|
  format: AvailableFormatsType,
|};
