import fp from 'lodash/fp';

const renderDefault = (ast, depth = 0) => {
  const makeIndent = count => `${'  '.repeat(count * 2)}`;

  const printValue = (value) => {
    if (value instanceof Object) {
      const res = Object.keys(value).map(key => `${makeIndent(depth + 2)}${key}: ${value[key]}`, []).join(', ');
      return `{\n${res}\n${makeIndent(depth + 1)}}`;
    }
    return value;
  };

  const makeEnt = (key, value) => `${key}: ${printValue(value)}`;

  const propertyActions = {
    added: elem => `${makeIndent(depth)}  + ${makeEnt(elem.keyName, elem.value)}`,
    deleted: elem => `${makeIndent(depth)}  - ${makeEnt(elem.keyName, elem.value)}`,
    unchanged: elem => `${makeIndent(depth)}    ${makeEnt(elem.keyName, elem.value)}`,
    updated: elem => `${makeIndent(depth)}  - ${makeEnt(elem.keyName, elem.oldValue)}\n${makeIndent(depth)}  + ${makeEnt(elem.keyName, elem.newValue)}`,
    nested: elem => `${makeIndent(depth)}    ${elem.keyName}: ${renderDefault(elem.value, depth + 1)}`,
  };

  const result = ast.map(node => propertyActions[node.type](node))
    .join('\n');
  return `{\n${result}\n${makeIndent(depth)}}`;
};

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

const renderJSON = (ast, depth = 0) => {
  const printNode = (node) => {
    const keys = fp.keys(node);

    const printObj = (obj) => {
      const result = Object.keys(obj).map(key => `${'\t'.repeat(depth + 2)}"${key}": "${obj[key]}"`, []).join(', ');
      return `{\n${result}\n${'\t'.repeat(depth + 1)}}`;
    };

    const printValue = (value) => {
      if (typeof value === 'string') return `"${value}"`;
      if (value instanceof Array) return renderJSON(value, depth + 1);
      if (value instanceof Object) return printObj(value, depth + 1);
      return `"${value}"`;
    };

    const result = keys.map(elem => `${'\t'.repeat(depth + 1)}"${elem}": ${printValue(node[elem])}`).join(',\n');
    return `${result}`;
  };

  const result = ast.map(elem => `{\n${printNode(elem, depth + 1)}\n${'\t'.repeat(depth)}}`).join(', ');
  return `[${result}]`;
};

export default (format) => {
  if (format === 'json') return renderJSON;
  if (format === 'plain') return renderPlain;
  return renderDefault;
};
