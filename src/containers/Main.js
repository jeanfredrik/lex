import { connect } from 'react-redux';
import {
  getActiveDoc,
} from '../selectors';
import {
  setDocValue,
} from '../actions';
import Main from '../components/Main';

import {
  parseDefinitions,
  parsePatterns,
  makeWords,
} from '../lib';

export default connect(
  (state) => {
    const activeDoc = getActiveDoc(state);
    return {
      ...activeDoc,
      words: makeWords(parseDefinitions(activeDoc.definitions), parsePatterns(activeDoc.patterns)),
    };
  },
  null,
  (stateProps, { dispatch }, ownProps) => ({
    ...stateProps,
    ...ownProps,
    onDefinitionsChange(event) {
      dispatch(setDocValue(stateProps.id, 'definitions', event.target.value));
    },
    onPatternsChange(event) {
      dispatch(setDocValue(stateProps.id, 'patterns', event.target.value));
    },
  }),
)(Main);
