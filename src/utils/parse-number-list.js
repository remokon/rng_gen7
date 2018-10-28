import {
  filter,
  isNaN,
  map,
  negate,
  parseInt,
  partial,
  replace
} from 'lodash-es';

export const parseList = (length, delimeter, str) => {
  const splitRegex = new RegExp(`.{1,${length}}`, 'g');
  const delimeterRegex = new RegExp(`${delimeter}`, 'g');

  return replace(str, delimeterRegex, '').match(splitRegex);
};

export const parseNumberList = (length, delimeter, str) => {
  const splitStr = parseList(length, delimeter, str);
  const nums = map(splitStr, parseInt);

  return filter(nums, negate(isNaN))
};

export const parseTSVList = partial(parseNumberList, 4, ', ');

export const parseIVList = partial(parseNumberList, 2, '/');

export const parseSeedList = partial(parseList, 8, ', ');