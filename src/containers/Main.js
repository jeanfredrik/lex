import { connect } from 'react-redux'
import { parse } from '@jeanfredrik/lex-parser'

import { getActiveDoc } from '../selectors'
import { setDocValue } from '../actions'
import Main from '../components/Main'
import { makeWords } from '../lib'

export default connect(
  state => {
    const activeDoc = getActiveDoc(state)
    let parsedInput = {}
    let error = null
    try {
      parsedInput = parse(activeDoc.input)[0] || {}
    } catch (parseError) {
      console.error(parseError)
      error = parseError
    }
    return {
      ...activeDoc,
      words: makeWords(parsedInput),
      error,
    }
  },
  null,
  (stateProps, { dispatch }, ownProps) => ({
    ...stateProps,
    ...ownProps,
    onInputChange(event) {
      dispatch(
        setDocValue(
          stateProps.id,
          'input',
          event.target.value,
        ),
      )
    },
  }),
)(Main)
