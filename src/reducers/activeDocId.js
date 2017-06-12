export default (activeDocId = null, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_DOC':
      return action.docId;
    default:
      return activeDocId;
  }
};
