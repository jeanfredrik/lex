import {
  flow,
  split,
  map,
  fromPairs,
  mapValues,
  sample,
  times,
  uniq,
} from 'lodash/fp';

export const parseDefinitions = flow([
  split(/[\r\n]+/g),
  map(split(/\s*=\s*/)),
  fromPairs,
  mapValues(split(/\s*,\s*|\s+/g)),
]);

export const parsePatterns = flow([
  split(/[\r\n]+/g),
]);

export function makeWord(pattern, definitions) {
  const re = new RegExp(`(${Object.keys(definitions).join('|')})`, 'g');
  return pattern.replace(re, (match, p1) => (
    sample(definitions[p1])
  ));
}

export function makeWords(definitions, patterns) {
  return flow([
    times(() => makeWord(sample(patterns), definitions)),
    uniq,
  ])(80);
}
