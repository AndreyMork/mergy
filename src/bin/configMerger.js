#!/usr/bin/env node
// @flow

import path from 'path';

import program from 'commander';
import fs from 'mz/fs';

import { version } from '../../package.json';
import type { MergeConfigsOptionsType, AvailableFormatsType } from '../types/index.types';

import mergeConfigs from '..';


type CmdType = {|
  format: AvailableFormatsType,
  out: ?string,
|};

program
  .version(version)
  .arguments('<config...>')
  .option('-o, --out <file>', 'Save merged config into a file')
  .option(
    '-f, --format <format>',
    'Availiable options are: json, yaml, yml. defaults to json',
    /^(json|yaml|yml)$/i,
    'json',
  )
  .action(async (filePaths: $ReadOnlyArray<string>, cmd: CmdType) => {
    const options: MergeConfigsOptionsType = {
      format: cmd.format,
    };

    const resolvedPaths: $ReadOnlyArray<string> = filePaths.map((filePath: string): string =>
      path.resolve(filePath));

    try {
      const res: string = await mergeConfigs(resolvedPaths, options);

      if (cmd.out == null) {
        console.log(res); // eslint-disable-line no-console
      } else {
        await fs.writeFile(path.resolve(cmd.out), res);
      }
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  })
  .parse(process.argv);
