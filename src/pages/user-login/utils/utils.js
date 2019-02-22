import { parse } from 'query-string';

// eslint-disable-next-line import/prefer-default-export
export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
