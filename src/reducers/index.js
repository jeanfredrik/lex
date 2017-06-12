import { combineReducers } from 'redux';
import docs from './docs';
import activeDocId from './activeDocId';

export default combineReducers({
  activeDocId,
  docs,
});
