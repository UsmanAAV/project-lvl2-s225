import fs from 'fs';
import genDiff from '../src';

const beforeJson = './__tests__/__fixtures__/before.json';
const beforeYaml = './__tests__/__fixtures__/before.yml';
const beforeIni = './__tests__/__fixtures__/before.ini';
const afterJson = './__tests__/__fixtures__/after.json';
const afterYaml = './__tests__/__fixtures__/after.yaml';
const afterIni = './__tests__/__fixtures__/after.ini';

test('genDiff', () => {
  expect(genDiff(beforeJson, afterJson)).toBe(fs.readFileSync('./__tests__/__fixtures__/exp-render-default.txt', 'utf8'));
  expect(genDiff(beforeJson, afterJson, 'plain')).toBe(fs.readFileSync('./__tests__/__fixtures__/exp-render-plain.txt', 'utf8'));
  expect(genDiff(beforeJson, afterJson, 'json')).toBe(fs.readFileSync('./__tests__/__fixtures__/exp-render-json.json', 'utf8'));
  expect(genDiff(beforeYaml, afterYaml)).toBe(fs.readFileSync('./__tests__/__fixtures__/exp-render-default.txt', 'utf8'));
  expect(genDiff(beforeYaml, afterYaml, 'plain')).toBe(fs.readFileSync('./__tests__/__fixtures__/exp-render-plain.txt', 'utf8'));
  expect(genDiff(beforeYaml, afterYaml, 'json')).toBe(fs.readFileSync('./__tests__/__fixtures__/exp-render-json.json', 'utf8'));
  expect(genDiff(beforeIni, afterIni)).toBe(fs.readFileSync('./__tests__/__fixtures__/exp-render-default.txt', 'utf8'));
  expect(genDiff(beforeIni, afterIni, 'plain')).toBe(fs.readFileSync('./__tests__/__fixtures__/exp-render-plain.txt', 'utf8'));
  expect(genDiff(beforeIni, afterIni, 'json')).toBe(fs.readFileSync('./__tests__/__fixtures__/exp-render-json.json', 'utf8'));
});
