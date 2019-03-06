import fp from 'lodash/fp';

const renderPlain = (ast, prefix = '') => {
  const printValue = (value, pref = '') => {
    if (value instanceof Object) {
      return 'complex value';
    }
    return `${pref}'${value}'`;
  };
  const propertyActions = {
    added: elem => `Property '${prefix}${elem.keyName}' was added with ${printValue(elem.newValue, 'value: ')}`,
    deleted: elem => `Property '${prefix}${elem.keyName}' was deleted`,
    updated: elem => `Property '${prefix}${elem.keyName}' was updated. From ${printValue(elem.value)} to ${printValue(elem.newValue)}`,
    nested: elem => renderPlain(elem.value, `${prefix}${elem.keyName}.`),
  };

  const astWithChangesOnly = fp.filter(node => node.type !== 'unchanged')(ast);
  const result = fp.map(node => propertyActions[node.type](node))(astWithChangesOnly)
    .join('\n');
  return result;
};

export default renderPlain;
