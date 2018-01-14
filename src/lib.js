import {
  filter,
  flow,
  fromPairs,
  map,
  sample,
  times,
  uniq,
} from 'lodash/fp'

const extractDefinitions = flow([
  filter(statement => statement.type === 'Definition'),
  map(({ identifier, items }) => [identifier, items]),
  fromPairs,
])

const extractPatterns = flow([
  filter(statement => statement.type === 'Pattern'),
])

const sampleBy = iterator => elements => {
  const sum = elements.reduce(
    (sum, element) => sum + iterator(element),
    0,
  )
  const rand = Math.random() * sum
  let curr = 0
  return elements.find(element => {
    curr += iterator(element)
    return curr > rand
  })
}

const samplePattern = sampleBy(pattern => pattern.weight)

const makePattern = ({ parts }) =>
  parts
    .filter(
      part =>
        part.weight == null || part.weight > Math.random(),
    )
    .map(
      part =>
        part.type === 'PatternFragment'
          ? part.grapheme
          : makePattern(part),
    )
    .join('')

const randomPattern = patterns => {
  let pattern = samplePattern(patterns)
  return makePattern(pattern)
}

function makeWord(pattern, definitions) {
  const re = new RegExp(
    `(${Object.keys(definitions).join('|')})`,
    'g',
  )
  return pattern.replace(re, (match, p1) =>
    sample(definitions[p1]),
  )
}

export function makeWords({ statements }) {
  if (!statements || statements.length === 0) {
    return []
  }
  const definitions = extractDefinitions(statements)
  const patterns = extractPatterns(statements)
  if (patterns.length === 0) {
    return []
  }
  return flow([
    times(() =>
      makeWord(randomPattern(patterns), definitions),
    ),
    uniq,
  ])(80)
}
