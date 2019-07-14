// @flow

import readFile from './readFile';
import parse from './parse';
import mergeObjects from './mergeObjects';
import render from './render';
import type { FileObjectType, MergyOptionsType, AvailableFormatsType } from './types/index.types';


const parseAndMerge = (
  fileObjects: $ReadOnlyArray<FileObjectType>,
  format: AvailableFormatsType,
): string => {
  const parsedValues: $ReadOnlyArray<mixed> = fileObjects.map((fileObject: FileObjectType): mixed =>
    parse(fileObject));

  const mergedConfig: {} = mergeObjects(...parsedValues);
  const renderedConfig: string = render({ value: mergedConfig, format });

  return renderedConfig;
};

const readParseAndMerge = async (
  filePaths: $ReadOnlyArray<string>,
  options: MergyOptionsType,
): Promise<string> => {
  const readFilePromises: $ReadOnlyArray<Promise<FileObjectType>> = filePaths.map(
    (filePath: string): Promise<FileObjectType> => readFile(filePath),
  );

  const fileObjects: $ReadOnlyArray<FileObjectType> = await Promise.all(readFilePromises);

  return parseAndMerge(fileObjects, options.format);
};

export { mergeObjects, parseAndMerge, readParseAndMerge };
