import fp from 'lodash/fp';

const renderPlain = (ast, prefix = '') => {
  const printValue = (value, pref = '') => {
    if (value instanceof Object) {
      return 'complex value';
    }
    return `${pref}'${value}'`;
  };
  const propertyActions = {
    added: elem => `Property '${prefix}${elem.keyName}' was added with ${printValue(elem.value, 'value: ')}`,
    deleted: elem => `Property '${prefix}${elem.keyName}' was deleted`,
    updated: elem => `Property '${prefix}${elem.keyName}' was updated. From ${printValue(elem.oldValue)} to ${printValue(elem.newValue)}`,
    nested: elem => renderPlain(elem.value, `${elem.keyName}.`),
  };

  const fullPrefixedChildsAST = fp.map((node) => {
    if (node.type === 'nested') {
      return fp.map(child => ({ ...child, keyName: `${node.keyName}.${child.keyName}` }))(node.value);
    }
    return node;
  })(ast);

  const unnestedAST = fp.flatten(fullPrefixedChildsAST);
  const astWithChangesOnly = fp.filter(node => node.type !== 'unchanged')(unnestedAST);
  const result = fp.map(node => propertyActions[node.type](node))(astWithChangesOnly)
    .join('\n');
  return result;
};

export default renderPlain;
