const renderJSON = (ast, indent = '') => {
  const printValue = (value) => {
    if (value instanceof Object) {
      const res = Object.keys(value).map(key => `        ${indent}${key}: ${value[key]}`, []).join(', ');
      return `{\n${res}\n    ${indent}}`;
    }
    return value;
  };

  const result =
    ast
      .map(elem =>
        `${indent}  ${elem.state}${elem.keyName}: ${(elem.value instanceof Array) ? renderJSON(elem.value, `${indent}    `) : printValue(elem.value)}`)
      .join('\n');
  return `{\n${result}\n${indent}}`;
};

export default (format) => {
  if (format === 'json') return renderJSON;
  return () => 'unknown format';
};
