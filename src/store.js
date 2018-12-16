import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

import { appReducer } from './appReducer'
import { appSaga } from './appSaga'

const sagaMiddleware = createSagaMiddleware()

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

function configureStore (initialState = {}) {
  const store = createStore(
    appReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  )

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(appSaga)
  }

  store.runSagaTask()
  return store
}

export default configureStore