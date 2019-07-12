// @flow

import path from 'path';
import fs from 'fs';

import mergeConfigs from '../src';


const pathToFixtures: string = path.join(__dirname, '__fixtures__');

const getTestFiles = (relativePathToTestFilesDir: string): $ReadOnlyArray<string> => {
  const pathToTestFilesDir: string = path.join(pathToFixtures, relativePathToTestFilesDir);

  return fs.readdirSync(pathToTestFilesDir).map((filepath: string): string => path.join(pathToTestFilesDir, filepath));
};

const pathToTargetsDir: string = path.join(__dirname, '__fixtures__', 'targets');
const getTargetFile = (filename: string): string => fs.readFileSync(path.join(pathToTargetsDir, filename), 'utf-8');

const removeSpaceCharacters = (str: string): string => [...str].filter((char: string): boolean => char.trim().length !== 0).join('');

it('merge configs', async () => {
  const testFiles: $ReadOnlyArray<string> = getTestFiles('mergeConfigs');
  const jsonRes: string = await mergeConfigs(testFiles, { format: 'json' });
  const yamlRes: string = await mergeConfigs(testFiles, { format: 'yaml' });

  const jsonTarget: string = removeSpaceCharacters(getTargetFile('target.json'));
  const yamlTarget: string = removeSpaceCharacters(getTargetFile('target.yaml'));

  expect(removeSpaceCharacters(jsonRes)).toBe(jsonTarget);
  expect(removeSpaceCharacters(yamlRes)).toBe(yamlTarget);
});
