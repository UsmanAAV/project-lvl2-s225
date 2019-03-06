import fp from 'lodash/fp';

const ADDED = 'added';
const DELETED = 'deleted';
const UNCHANGED = 'unchanged';
const UPDATED = 'updated';
const NESTED = 'nested';

const buildAST = (objBefore, objAfter) => {
  const getType = (value, newValue) => {
    if (value instanceof Object && newValue instanceof Object) return NESTED;
    if (value === newValue) return UNCHANGED;
    if (!!value && !newValue) return DELETED;
    if (!value && !!newValue) return ADDED;
    return UPDATED;
  };

  const makeNode = {
    [NESTED]: (key, value, newValue) => ({
      keyName: key,
      type: NESTED,
      value: buildAST(value, newValue),
    }),
    [UNCHANGED]: (key, value) => ({
      keyName: key,
      type: UNCHANGED,
      value,
    }),
    [UPDATED]: (key, oldValue, newValue) => ({
      keyName: key,
      type: UPDATED,
      oldValue,
      newValue,
    }),
    [DELETED]: (key, value) => ({
      keyName: key,
      type: DELETED,
      value,
    }),
    [ADDED]: (key, value, newValue) => ({
      keyName: key,
      type: ADDED,
      value: newValue,
    }),
  };

  const keys = fp.keys({ ...objBefore, ...objAfter });

  return fp.reduce((arr, key) => {
    const value = objBefore[key];
    const newValue = objAfter[key];
    const type = getType(value, newValue);
    const node = makeNode[type](key, value, newValue);
    return [...arr, node];
  }, [])(keys);
};

export default buildAST;
