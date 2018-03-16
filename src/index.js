import fp from 'lodash/fp';
import extractDataToObject from './parsers';
import render from './renderers';

const ADDED = 'added';
const DELETED = 'deleted';
const UNCHANGED = 'unchanged';
const UPDATED = 'updated';
const NESTED = 'nested';

export const getAST = (objBefore, objAfter) => {
  const makeObj = (keyName, type, value) => ({ keyName, type, value });

  const keys = fp.keys({ ...objBefore, ...objAfter });

  const result = fp.reduce(
    (arr, key) => {
      const oldValue = objBefore[key];
      const newValue = objAfter[key];

      if (oldValue instanceof Object && newValue instanceof Object) {
        return [...arr, makeObj(key, NESTED, getAST(oldValue, newValue))];
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

const genDiff = (pathToBefore, pathToAfter, format = 'json') => {
  const beforeConfig = extractDataToObject(pathToBefore);
  const afterConfig = extractDataToObject(pathToAfter);

  const ast = getAST(beforeConfig, afterConfig);
  const result = render(format)(ast);

  return result;
};

export default genDiff;
