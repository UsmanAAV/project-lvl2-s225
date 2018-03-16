import fs from 'fs';
import path from 'path';
import fp from 'lodash/fp';
import getParser from './parsers';

const ADDED = '+ ';
const DELETED = '- ';
const UNCHANGED = '  ';

export const convertFileToObject = (pathToFile) => {
  const ext = path.extname(pathToFile);
  const data = fs.readFileSync(pathToFile, 'utf8');
  const parser = getParser(ext);
  return parser.parse(data);
};

const makeObj = (keyName, state, value) => ({ keyName, state, value });

export const getAST = (objBefore, objAfter) => {
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

const render = (ast, indent = '') => {
  const printValue = (value) => {
    if (value instanceof Object) {
      const res = Object.keys(value).map(key => `        ${indent}${key}: ${value[key]}`, []).join(', ');
      return `{\n${res}\n    ${indent}}`;
    }
    return value;
  };
  const result =
    ast
      .map(elem =>
        `${indent}  ${elem.state}${elem.keyName}: ${(elem.value instanceof Array) ? render(elem.value, `${indent}    `) : printValue(elem.value)}`)
      .join('\n');
  return `{\n${result}\n${indent}}`;
};

const genDiff = (pathToBefore, pathToAfter) => {
  const beforeConfig = convertFileToObject(pathToBefore);
  const afterConfig = convertFileToObject(pathToAfter);

  console.dir(pathToBefore, ' \n', beforeConfig);
  console.dir(pathToAfter, ' \n', afterConfig);

  const result = render(getAST(beforeConfig, afterConfig));

  return result;
};

export default genDiff;
