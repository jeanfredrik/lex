import { compose, createStore } from 'redux'
import { pick } from 'lodash/fp'

import reducer from './reducers'
import persist from './persist'
import migrate from './migrate'

migrate()

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
  persist(
    pick(['docs']),
    'PATCH_FROM_LOCAL_STORAGE',
    'jeanfredrik/lex/3',
  ),
)

const store = createStore(reducer, enhancer)

export default store
