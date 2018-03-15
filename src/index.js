import fs from 'fs';
import path from 'path';
import getParser from './parsers';

const convertFileToObject = (pathToFile) => {
  const ext = path.extname(pathToFile);
  const data = fs.readFileSync(pathToFile);
  const parser = getParser(ext);
  return parser.parse(data);
};

const genDiff = (pathToBefore, pathToAfter) => {
  const beforeConfig = convertFileToObject(pathToBefore);
  const afterConfig = convertFileToObject(pathToAfter);

  const objKeys = Object.keys(beforeConfig).concat(Object.keys(afterConfig));
  const keys = Array.from(new Set(objKeys));

  const resultArray = keys.reduce(
    (acc, key) => {
      if (beforeConfig[key] === afterConfig[key]) {
        return acc.concat(`    ${key}: ${beforeConfig[key]}`);
      }
      if (key in beforeConfig && key in afterConfig && beforeConfig[key] !== afterConfig[key]) {
        return acc.concat(`  + ${key}: ${afterConfig[key]}`).concat(`  - ${key}: ${beforeConfig[key]}`);
      }
      if (key in beforeConfig && !(key in afterConfig)) {
        return acc.concat(`  - ${key}: ${beforeConfig[key]}`);
      }
      if (!(key in beforeConfig) && key in afterConfig) {
        return acc.concat(`  + ${key}: ${afterConfig[key]}`);
      }
      return acc;
    },
    [],
  );
  const result = `{\n${resultArray.join('\n')}\n}`;

  return result;
};

export default genDiff;
