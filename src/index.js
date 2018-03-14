import fs from 'fs';

const genDiff = (pathToBefore, pathToAfter) => {
  const beforeFile = fs.readFileSync(pathToBefore);
  const afterFile = fs.readFileSync(pathToAfter);
  const beforeJSON = JSON.parse(beforeFile);
  const afterJSON = JSON.parse(afterFile);

  const objKeys = Object.keys(beforeJSON).concat(Object.keys(afterJSON));
  const keys = Array.from(new Set(objKeys));

  const resultArray = keys.reduce(
    (acc, key) => {
      if (beforeJSON[key] === afterJSON[key]) {
        return acc.concat(`    ${key}: ${beforeJSON[key]}`);
      }
      if (key in beforeJSON && key in afterJSON && beforeJSON[key] !== afterJSON[key]) {
        return acc.concat(`  + ${key}: ${afterJSON[key]}`).concat(`  - ${key}: ${beforeJSON[key]}`);
      }
      if (key in beforeJSON && !(key in afterJSON)) {
        return acc.concat(`  - ${key}: ${beforeJSON[key]}`);
      }
      if (!(key in beforeJSON) && key in afterJSON) {
        return acc.concat(`  + ${key}: ${afterJSON[key]}`);
      }
      return acc;
    },
    [],
  );
  const result = `{\n${resultArray.join('\n')}\n}`;

  return result;
};

export default genDiff;
