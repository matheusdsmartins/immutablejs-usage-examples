import { combineReducers } from 'redux-immutable'
import { all } from 'redux-saga/effects'

import exampleReducer from './example/reducers'
import exampleSagas from './example/sagas'

export function * rootSaga () {
  yield all([
    exampleSagas()
  ])
}

export default combineReducers({
  example: exampleReducer
})
