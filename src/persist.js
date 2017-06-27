import { applyMiddleware } from 'redux';
import {
  isEqual,
} from 'lodash/fp';

import localStorage from './localStorage';

export default (select, actionType = 'PATCH_FROM_LOCAL_STORAGE', key = 'store') => applyMiddleware((store) => {
  const storage = localStorage;
  const patchFromLocalStorage = values => ({
    type: actionType,
    values: select(values),
  });
  // Subscribe to `storage` events (i.e. changes in other browser windows)
  storage.onUpdate(key, (values) => {
    store.dispatch(patchFromLocalStorage(values));
  });
  // Begin by patching
  const values = storage.get(key);
  if (values != null) {
    store.dispatch(patchFromLocalStorage(values));
  }
  // Return the actual middleware where we react to changes in the store and update the storage
  return next => (action) => {
    // We should not react to the patch action
    if (action.type === actionType) {
      return next(action);
    }
    // Only update storage if there’s actually been a change
    // to the part of the state that we care about (via `select`)
    const oldState = store.getState();
    const result = next(action);
    const newState = store.getState();
    const oldValue = select(oldState);
    const newValue = select(newState);
    if (!isEqual(oldValue, newValue)) {
      storage.set(key, newValue);
    }
    return result;
  };
});
