// @flow

import path from 'path';

import fs from 'mz/fs';

import type { FileObjectType } from './types/index.types';


export default async (filePath: string): Promise<FileObjectType> => {
  const ext: string = path.extname(filePath);
  const content: string = await fs.readFile(filePath, 'utf-8');

  return { content, ext };
};
