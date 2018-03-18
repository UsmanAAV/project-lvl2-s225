import fp from 'lodash/fp';

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

export default renderJSON;
