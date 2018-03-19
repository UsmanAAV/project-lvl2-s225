import renderJSON from './json';
import renderDefault from './default';
import renderPlain from './plain';

export default (format) => {
  if (format === 'json') return renderJSON;
  if (format === 'plain') return renderPlain;
  return renderDefault;
};
