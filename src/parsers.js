import ini from 'ini';
import { safeLoad, safeDump } from 'js-yaml';

const jsonParser = {
  parse: JSON.parse,
  stringify: JSON.stringify,
};

const yamlParser = {
  parse: safeLoad, stringify: safeDump,
};

const iniParser = {
  parse: ini.parse,
  stringify: ini.stringify,
};

const parsers = {
  '.json': jsonParser,
  '.yaml': yamlParser,
  '.yml': yamlParser,
  '.ini': iniParser,
};

const getParser = (format = '') => {
  const parser = parsers[format];
  if (!parser) {
    throw new Error(`unknown format: ${format}`);
  }
  return parser;
};

export default (extension) => getParser(extension).parse;
