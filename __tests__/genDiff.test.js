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

test('genDiff-json-recursive', () => {
  const expected = fs.readFileSync('./__tests__/__fixtures__/expected-recursive.txt', 'utf8');
  expect(genDiff('./__tests__/__fixtures__/before-recursive.json', './__tests__/__fixtures__/after-recursive.json'))
    .toBe(expected);
});

test('genDiff-yaml-recursive', () => {
  const expected = fs.readFileSync('./__tests__/__fixtures__/expected-recursive.txt', 'utf8');
  expect(genDiff('./__tests__/__fixtures__/before-recursive.yml', './__tests__/__fixtures__/after-recursive.yaml'))
    .toBe(expected);
});

test('genDiff-ini-recursive', () => {
  const expected = fs.readFileSync('./__tests__/__fixtures__/expected-recursive.txt', 'utf8');
  expect(genDiff('./__tests__/__fixtures__/before-recursive.ini', './__tests__/__fixtures__/after-recursive.ini'))
    .toBe(expected);
});

test('genDiff-json-recursive-plain', () => {
  const expected = fs.readFileSync('./__tests__/__fixtures__/expected-recursive-plain.txt', 'utf8');
  expect(genDiff('./__tests__/__fixtures__/before-recursive.json', './__tests__/__fixtures__/after-recursive.json', 'plain'))
    .toBe(expected);
});

test('genDiff-yaml-recursive-plain', () => {
  const expected = fs.readFileSync('./__tests__/__fixtures__/expected-recursive-plain.txt', 'utf8');
  expect(genDiff('./__tests__/__fixtures__/before-recursive.yml', './__tests__/__fixtures__/after-recursive.yaml', 'plain'))
    .toBe(expected);
});

test('genDiff-ini-recursive-plain', () => {
  const expected = fs.readFileSync('./__tests__/__fixtures__/expected-recursive-plain.txt', 'utf8');
  expect(genDiff('./__tests__/__fixtures__/before-recursive.ini', './__tests__/__fixtures__/after-recursive.ini', 'plain'))
    .toBe(expected);
});
