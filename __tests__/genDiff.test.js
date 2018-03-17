import { makeAST } from '../src';
import extractDataToObject from '../src/parsers';
import render from '../src/renderers';

const fs = require('fs');

test('parse-before-json', () => {
  const expected = JSON.stringify(JSON.parse(fs.readFileSync('./__tests__/__fixtures__/exp-parse-before.json', 'utf8')));
  expect(JSON.stringify(extractDataToObject('./__tests__/__fixtures__/before.json')))
    .toBe(expected);
});

test('parse-before-yaml', () => {
  const expected = JSON.stringify(JSON.parse(fs.readFileSync('./__tests__/__fixtures__/exp-parse-before.json', 'utf8')));
  expect(JSON.stringify(extractDataToObject('./__tests__/__fixtures__/before.yml')))
    .toBe(expected);
});

test('parse-before-ini', () => {
  const expected = JSON.stringify(JSON.parse(fs.readFileSync('./__tests__/__fixtures__/exp-parse-before.json', 'utf8')));
  expect(JSON.stringify(extractDataToObject('./__tests__/__fixtures__/before.ini')))
    .toBe(expected);
});

test('makeAST', () => {
  const expected = JSON.stringify(JSON.parse(fs.readFileSync('./__tests__/__fixtures__/exp-ast.json', 'utf8')));
  const oldObj = extractDataToObject('./__tests__/__fixtures__/before.ini');
  const newObj = extractDataToObject('./__tests__/__fixtures__/after.ini');
  expect(JSON.stringify(makeAST(oldObj, newObj)))
    .toBe(expected);
});

test('render-default', () => {
  const expected = fs.readFileSync('./__tests__/__fixtures__/exp-render-default.txt', 'utf8');
  expect(render()(extractDataToObject('./__tests__/__fixtures__/exp-ast.json')))
    .toBe(expected);
});

test('render-plain', () => {
  const expected = fs.readFileSync('./__tests__/__fixtures__/exp-render-plain.txt', 'utf8');
  expect(render('plain')(extractDataToObject('./__tests__/__fixtures__/exp-ast.json')))
    .toBe(expected);
});
/*
test('render-json', () => {
  const expected = fs.readFileSync('./__tests__/__fixtures__/exp-render-json.json', 'utf8');
  expect(render('json')(extractDataToObject('./__tests__/__fixtures__/exp-ast.json')))
    .toBe(expected);
});
*/
