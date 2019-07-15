// @flow

import path from 'path';
import fs from 'fs';

import type { FileObjectType, AvailableFormatsType } from './types/index.types';


const extensionToFormatMap: { +[string]: AvailableFormatsType } = {
  '.json': 'json',
  '.yaml': 'yaml',
  '.yml': 'yaml',
};

export default async (filePath: string): Promise<FileObjectType> => {
  const extension: string = path.extname(filePath);
  const content: string = await fs.promises.readFile(filePath, 'utf-8');
  const format: ?AvailableFormatsType = extensionToFormatMap[extension];
  if (format == null) {
    throw new Error(`Unknown extension ${extension}`);
  }

  return { content, format };
};
