import path from 'path';
import ini from 'ini';
import { safeLoad, safeDump } from 'js-yaml';
import getdata from './getdata';

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

export default (pathToFile) => {
  const ext = path.extname(pathToFile);
  const parser = getParser(ext);
  return parser.parse(getdata(pathToFile));
};
