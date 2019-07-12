// @flow

import readConfigFile from './readConfigFile';
import parse from './parse';
import mergeObjects from './mergeObjects';
import render from './render';
import { isObject } from './utils';
import type { FileObjectType, MergeConfigsOptionsType, ParsedValueType } from './types/index.types';


export default async (
  filePaths: $ReadOnlyArray<string>,
  options: MergeConfigsOptionsType,
): Promise<string> => {
  const fileObjects: $ReadOnlyArray<FileObjectType> = await Promise.all(
    filePaths.map((filePath: string): Promise<FileObjectType> => readConfigFile(filePath)),
  );

  const configObjects: $ReadOnlyArray<{}> = fileObjects.map((fileObject: FileObjectType): {} => {
    const parsedValue: ParsedValueType = parse(fileObject);

    if (!isObject(parsedValue)) {
      throw new TypeError(`Can't merge ${typeof parsedValue}.`);
    }

    return parsedValue;
  });

  const mergedConfig: {} = mergeObjects(...configObjects);
  const renderedConfig: string = render(mergedConfig, options.format);

  return renderedConfig;
};
