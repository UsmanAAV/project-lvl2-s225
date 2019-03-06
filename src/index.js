import path from 'path';
import fs from 'fs';
import parse from './parsers';
import render from './renderers';
import makeAST from './ast';

const genDiff = (pathToOldConfig, pathToNewConfig, format = 'stylish') => {
  const oldExtension = path.extname(pathToOldConfig);
  const oldText = fs.readFileSync(pathToOldConfig, 'utf8');
  const oldConfig = parse(oldExtension)(oldText);

  const newExtension = path.extname(pathToNewConfig);
  const newText = fs.readFileSync(pathToNewConfig, 'utf8');
  const newConfig = parse(newExtension)(newText);

  const ast = makeAST(oldConfig, newConfig);
  const result = render(format)(ast);

  return result;
};

export default genDiff;
