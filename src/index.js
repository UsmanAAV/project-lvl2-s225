import fp from 'lodash/fp';
import extractDataToObject from './parsers';
import render from './renderers';

const ADDED = '+ ';
const DELETED = '- ';
const UNCHANGED = '  ';

export const getAST = (objBefore, objAfter) => {
  const makeObj = (keyName, state, value) => ({ keyName, state, value });

  const keys = Object.keys(objBefore)
    .concat(Object.keys(objAfter))
    .reduce((obj, key) => ({ ...obj, [key]: key }), {});

  const result = fp.reduce(
    (arr, key) => {
      const valueBefore = objBefore[key];
      const valueAfter = objAfter[key];

      if (valueBefore instanceof Object && valueAfter instanceof Object) {
        return [...arr, makeObj(key, UNCHANGED, getAST(valueBefore, valueAfter))];
      }
      if (valueBefore === valueAfter) {
        return [...arr, makeObj(key, UNCHANGED, valueBefore)];
      }
      if (valueBefore !== valueAfter && key in objBefore && key in objAfter) {
        return [...arr, makeObj(key, DELETED, valueBefore), makeObj(key, ADDED, valueAfter)];
      }
      if (key in objBefore && !(key in objAfter)) {
        return [...arr, makeObj(key, DELETED, valueBefore)];
      }
      if (!(key in objBefore) && (key in objAfter)) {
        return [...arr, makeObj(key, ADDED, valueAfter)];
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

  const result = render(format)(getAST(beforeConfig, afterConfig));

  return result;
};

export default genDiff;
