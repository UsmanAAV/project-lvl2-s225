import renderJSON from './renderers/json';
import renderDefault from './renderers/default';
import renderPlain from './renderers/plain';

export default (format) => {
  if (format === 'json') return renderJSON;
  if (format === 'plain') return renderPlain;
  return renderDefault;
};
