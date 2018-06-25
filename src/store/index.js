import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'

import axiosInstance from '../utils/http'
import exampleReducer from './example/reducers'
import exampleSagas from './example/sagas'

export function * rootSaga () {
  yield all([
    exampleSagas()
  ])
}

export default combineReducers({
  exampleReducer
})
