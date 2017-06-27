import {
  filter,
  flow,
  fromPairs,
  map,
  mapValues,
  sample,
  split,
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

const extractDefinitions = flow([
  filter(statement => statement.type === 'Definition'),
  map(({ identifier, items }) => [identifier, items]),
  fromPairs,
]);

const extractPatterns = flow([
  filter(statement => statement.type === 'Pattern'),
  map('pattern'),
]);

export function makeWord(pattern, definitions) {
  const re = new RegExp(`(${Object.keys(definitions).join('|')})`, 'g');
  return pattern.replace(re, (match, p1) => (
    sample(definitions[p1])
  ));
}

export function makeWords({ statements }) {
  if (!statements || statements.length === 0) {
    return [];
  }
  const definitions = extractDefinitions(statements);
  const patterns = extractPatterns(statements);
  if (patterns.length === 0) {
    return [];
  }
  return flow([
    times(() => makeWord(sample(patterns), definitions)),
    uniq,
  ])(80);
}
