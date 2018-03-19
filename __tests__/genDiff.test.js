import genDiff from '../src';
import getdata from '../src/getdata';

const beforeJson = './__tests__/__fixtures__/before.json';
const beforeYaml = './__tests__/__fixtures__/before.yml';
const beforeIni = './__tests__/__fixtures__/before.ini';
const afterJson = './__tests__/__fixtures__/after.json';
const afterYaml = './__tests__/__fixtures__/after.yaml';
const afterIni = './__tests__/__fixtures__/after.ini';
const expectedRenderDefault = getdata('./__tests__/__fixtures__/exp-render-default.txt');
const expectedRenderPlain = getdata('./__tests__/__fixtures__/exp-render-plain.txt');
const expectedRenderJson = getdata('./__tests__/__fixtures__/exp-render-json.json');

test('genDiff', () => {
  expect(genDiff(beforeJson, afterJson)).toBe(expectedRenderDefault);
  expect(genDiff(beforeJson, afterJson, 'plain')).toBe(expectedRenderPlain);
  expect(genDiff(beforeJson, afterJson, 'json')).toBe(expectedRenderJson);
  expect(genDiff(beforeYaml, afterYaml)).toBe(expectedRenderDefault);
  expect(genDiff(beforeYaml, afterYaml, 'plain')).toBe(expectedRenderPlain);
  expect(genDiff(beforeYaml, afterYaml, 'json')).toBe(expectedRenderJson);
  expect(genDiff(beforeIni, afterIni)).toBe(expectedRenderDefault);
  expect(genDiff(beforeIni, afterIni, 'plain')).toBe(expectedRenderPlain);
  expect(genDiff(beforeIni, afterIni, 'json')).toBe(expectedRenderJson);
});
