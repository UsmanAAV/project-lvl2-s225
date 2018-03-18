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

export default renderDefault;
