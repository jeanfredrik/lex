import randomstring from 'randomstring'
import { set, findIndex } from 'lodash/fp'

const defaultDocValues = {
  input: [
    '# Start by defining symbol classes',
    'C=p,b,t,d,k,g,s,l,m,n,r,y,w',
    'F=s,l,m,n,r,y,w',
    'V=a,e,i,o,u',
    '',
    '# Define patterns that the generator will use',
    'CV',
    '# Subpatterns inside parantheses will only be used half of the time.',
    'CV(F)',
    '',
    '# Make patterns appear more or less often by adding weight:',
    'CV(CV) * 0.5',
    '# You can also use division:',
    'CV(CV) / 2',
    '',
    '# Subpatterns can also have weights:',
    'CV(CV*0.75)',
    '# And you can nest them as well:',
    'CV((F)CV)',
    '',
    '# Lines starting with a # sign will be ignored and can be used to write comments.',
    '',
  ].join('\n'),
}

export default (docs = [], action) => {
  switch (action.type) {
    case 'PATCH_FROM_LOCAL_STORAGE':
      return action.values.docs
    case 'ADD_DOC':
      return [
        ...docs,
        {
          id: randomstring.generate(),
          ...defaultDocValues,
        },
      ]
    case 'SET_DOC_VALUE':
      const index = findIndex(
        doc => doc.id === action.docId,
        docs,
      )
      if (~index) {
        return set([index, action.key], action.value, docs)
      }
      return docs
    default:
      return docs
  }
}
