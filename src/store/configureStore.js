import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'

import rootReducer, { rootSaga } from './index'
import axiosInstance from '../utils/http'

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})

const sagaMiddleware = createSagaMiddleware()

export default ({ initialState } = {}) => {
  const enhancer = composeEnhancers(
    applyMiddleware(
      thunk,
      sagaMiddleware
    )
  )

  let store = createStore(
    rootReducer,
    initialState,
    enhancer
  )

  sagaMiddleware.run(rootSaga)

  return { store }
}
