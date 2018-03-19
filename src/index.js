import fp from 'lodash/fp';
import path from 'path';
import fs from 'fs';
import parse from './parsers';
import render from './renderers';

const ADDED = 'added';
const DELETED = 'deleted';
const UNCHANGED = 'unchanged';
const UPDATED = 'updated';
const NESTED = 'nested';

export const makeAST = (objBefore, objAfter) => {
  const makeObj = (keyName, type, value) => ({ keyName, type, value });

  const keys = fp.keys({ ...objBefore, ...objAfter });

  const result = fp.reduce(
    (arr, key) => {
      const oldValue = objBefore[key];
      const newValue = objAfter[key];

      if (oldValue instanceof Object && newValue instanceof Object) {
        return [...arr, makeObj(key, NESTED, makeAST(oldValue, newValue))];
      }
      if (oldValue === newValue) {
        return [...arr, makeObj(key, UNCHANGED, oldValue)];
      }
      if (oldValue !== newValue && key in objBefore && key in objAfter) {
        return [...arr, { ...makeObj(key, UPDATED), oldValue, newValue }];
      }
      if (key in objBefore && !(key in objAfter)) {
        return [...arr, makeObj(key, DELETED, oldValue)];
      }
      if (!(key in objBefore) && (key in objAfter)) {
        return [...arr, makeObj(key, ADDED, newValue)];
      }
      return arr;
    },
    {},
  )(keys);

  return result;
};

const genDiff = (pathToOldConfig, pathToNewConfig, format = 'stylish') => {
  const oldExtension = path.extname(pathToOldConfig);
  const oldText = fs.readFileSync(pathToOldConfig, 'utf8');
  const oldConfig = parse(oldExtension)(oldText);

  const newExtension = path.extname(pathToNewConfig);
  const newText = fs.readFileSync(pathToNewConfig, 'utf8');
  const newConfig = parse(newExtension)(newText);

  const ast = makeAST(oldConfig, newConfig);
  const result = render(format)(ast);

  return result;
};

export default genDiff;
