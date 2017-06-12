import React from 'react';
import ReactDOM from 'react-dom';
import {
  Provider,
} from 'react-redux';

import App from './App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import {
  addDoc,
  setActiveDoc,
} from './actions';

import './f.css';
import './index.css';

if ((store.getState()).docs.length === 0) {
  store.dispatch(addDoc());
}

if (!(store.getState()).activeDocId) {
  store.dispatch(setActiveDoc((store.getState()).docs[0].id));
}

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('root'),
);

registerServiceWorker();
