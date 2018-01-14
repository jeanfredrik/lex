import randomstring from 'randomstring'
import { set, findIndex } from 'lodash/fp'

const defaultDocValues = {
  input: [
    'C=p,b,t,d,k,g,s,l,m,n,r,y,w',
    'F=s,l,m,n,r,y,w',
    'V=a,e,i,o,u',
    '',
    'CV',
    'CVF',
    'CVFCV',
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
