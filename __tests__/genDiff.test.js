import fs from 'fs';
import genDiff from '../src';

const beforeJson = './__tests__/__fixtures__/before.json';
const beforeYaml = './__tests__/__fixtures__/before.yml';
const beforeIni = './__tests__/__fixtures__/before.ini';
const afterJson = './__tests__/__fixtures__/after.json';
const afterYaml = './__tests__/__fixtures__/after.yaml';
const afterIni = './__tests__/__fixtures__/after.ini';

const resultStylish = fs.readFileSync(
  './__tests__/__fixtures__/exp-render-default.txt',
  'utf8',
);
const resultPlain = fs.readFileSync(
  './__tests__/__fixtures__/exp-render-plain.txt',
  'utf8',
);
const resultJSON = JSON.stringify(
  JSON.parse(
    fs.readFileSync('./__tests__/__fixtures__/exp-render-json.json', 'utf8'),
  ),
);

test('genDiff', () => {
  expect(genDiff(beforeJson, afterJson)).toBe(resultStylish);
  expect(genDiff(beforeJson, afterJson, 'plain')).toBe(resultPlain);
  expect(genDiff(beforeJson, afterJson, 'json')).toBe(resultJSON);
  expect(genDiff(beforeYaml, afterYaml)).toBe(resultStylish);
  expect(genDiff(beforeYaml, afterYaml, 'plain')).toBe(resultPlain);
  expect(genDiff(beforeYaml, afterYaml, 'json')).toBe(resultJSON);
  expect(genDiff(beforeIni, afterIni)).toBe(resultStylish);
  expect(genDiff(beforeIni, afterIni, 'plain')).toBe(resultPlain);
  expect(genDiff(beforeIni, afterIni, 'json')).toBe(resultJSON);
});
