import genDiff from '../src';

const fs = require('fs');

test('genDiff-json', () => {
  const expected = fs.readFileSync('./__tests__/__fixtures__/expected.txt', 'utf8');
  expect(genDiff('./__tests__/__fixtures__/before.json', './__tests__/__fixtures__/after.json'))
    .toBe(expected);
});

test('genDiff-yaml', () => {
  const expected = fs.readFileSync('./__tests__/__fixtures__/expected.txt', 'utf8');
  expect(genDiff('./__tests__/__fixtures__/before.yml', './__tests__/__fixtures__/after.yaml'))
    .toBe(expected);
});

test('genDiff-ini', () => {
  const expected = fs.readFileSync('./__tests__/__fixtures__/expected.txt', 'utf8');
  expect(genDiff('./__tests__/__fixtures__/before.ini', './__tests__/__fixtures__/after.ini'))
    .toBe(expected);
});
