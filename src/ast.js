import fp from 'lodash/fp';

const ADDED = 'added';
const DELETED = 'deleted';
const UNCHANGED = 'unchanged';
const UPDATED = 'updated';
const NESTED = 'nested';

const getNodeType = (value, newValue) => {
  if (value instanceof Object && newValue instanceof Object) return NESTED;
  if (value === newValue) return UNCHANGED;
  if (!!value && !newValue) return DELETED;
  if (!value && !!newValue) return ADDED;
  return UPDATED;
};

const buildNode = (keyName, type, value, newValue) => ({
  keyName,
  type,
  value,
  newValue,
});

const buildAST = (objBefore, objAfter) => {
  const buildNodeByType = {
    [NESTED]: (key, value, newValue) => buildNode(key, NESTED, buildAST(value, newValue)),
    [UNCHANGED]: (key, value) => buildNode(key, UNCHANGED, value),
    [DELETED]: (key, value) => buildNode(key, DELETED, value),
    [ADDED]: (key, value, newValue) => buildNode(key, ADDED, value, newValue),
    [UPDATED]: (key, value, newValue) => buildNode(key, UPDATED, value, newValue),
  };

  const keys = fp.keys({ ...objBefore, ...objAfter });

  return fp.reduce((arr, key) => {
    const value = objBefore[key];
    const newValue = objAfter[key];
    const nodeType = getNodeType(value, newValue);
    const node = buildNodeByType[nodeType](key, value, newValue);
    return [...arr, node];
  }, [])(keys);
};

export default buildAST;
