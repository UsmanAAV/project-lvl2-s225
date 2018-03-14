import fs from 'fs';
import _ from 'lodash/fp';

const genDiff = (pathToBefore, pathToAfter) => {
  const beforeFile = fs.readFileSync(pathToBefore);
  const afterFile = fs.readFileSync(pathToAfter);
  const beforeJSON = JSON.parse(beforeFile);
  const afterJSON = JSON.parse(afterFile);

  const reduce = _.reduce.convert({ cap: false });

  const notChanged = reduce(
    (arr, value, key) => {
      if (key in afterJSON && value === afterJSON[key]) {
        return arr.concat(`    ${key}: ${beforeJSON[key]}`);
      }
      return arr;
    },
    [],
  )(beforeJSON);

  const changed = reduce(
    (arr, value, key) => {
      if (key in afterJSON && value !== afterJSON[key]) {
        return arr.concat(`  + ${key}: ${afterJSON[key]}`).concat(`  - ${key}: ${beforeJSON[key]}`);
      }
      return arr;
    },
    notChanged,
  )(beforeJSON);

  const deleted = reduce(
    (arr, value, key) => {
      if (!(key in afterJSON)) return arr.concat(`  - ${key}: ${beforeJSON[key]}`);
      return arr;
    },
    changed,
  )(beforeJSON);

  const added = reduce(
    (arr, value, key) => {
      if (!(key in beforeJSON)) {
        return arr.concat(`  + ${key}: ${value}`);
      }
      return arr;
    },
    deleted,
  )(afterJSON);

  const result = `{\n${added.join('\n')}\n}`;
  return result;
};

export default genDiff;
