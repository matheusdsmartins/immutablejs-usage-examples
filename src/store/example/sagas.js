import { all, takeLatest, put } from 'redux-saga/effects'

import * as actions from './actions'
import * as types from './constants'

export function * updateForm (payload) {
  try {
    yield put(actions.updateForm(payload))
  } catch (error) {
    yield console.error(error)
  }
}

// Watchers
export function * watchUpdateForm () {
  yield takeLatest(types.REQUEST_UPDATE_FORM, updateForm)
}

export default function * exampleSagas () {
  yield all([
    watchUpdateForm()
  ])
}
