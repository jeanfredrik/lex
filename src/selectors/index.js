import { createSelector } from 'reselect';

export const getActiveDoc = createSelector(
  state => state.docs,
  state => state.activeDocId,
  (docs, activeDocId) => docs.find(doc => doc.id === activeDocId),
);
