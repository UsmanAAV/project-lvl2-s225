import renderJSON from './json';
import renderStylish from './stylish';
import renderPlain from './plain';

const renderers = {
  stylish: renderStylish,
  json: renderJSON,
  plain: renderPlain,
};

const getRenderer = (format) => {
  const renderer = renderers[format];
  if (!renderer) {
    throw new Error(`unknown format: ${format}`);
  }
  return renderer;
};

export default (format) => getRenderer(format);
