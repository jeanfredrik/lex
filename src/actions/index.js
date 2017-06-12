export function setDocValue(docId, key, value) {
  return {
    type: 'SET_DOC_VALUE',
    docId,
    key,
    value,
  };
}

export function setActiveDoc(docId) {
  return {
    type: 'SET_ACTIVE_DOC',
    docId,
  };
}

export function addDoc() {
  return {
    type: 'ADD_DOC',
  };
}
