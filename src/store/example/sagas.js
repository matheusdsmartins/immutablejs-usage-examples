import { all, call, takeLatest, put, select } from 'redux-saga/effects'
import { has } from 'lodash'

import * as actions from './actions'
import * as types from './constants'
import * as services from './services'

import { openSingleNotification } from '../../utils/utils'

import history from '../../routes/history'

export function * fetchAppData () {
  try {
    const id = yield select(state => state.auth.user.id)
    const profile = yield call(services.getProfile, id)
    const roles = yield call(services.getRoles)
    yield put(actions.fetchAppDataSuccessful({ profile: profile, roles: roles }))
  } catch (error) {
    yield put(actions.fetchAppDataFailure(error))
  }
}

export function * getRoles () {
  try {
    const roles = yield call(services.getRoles)
    yield put(actions.getRolesSuccessful(roles))
  } catch (error) {
    yield put(actions.getRolesFailure(error))
  }
}

export function * saveProfile ({ payload }) {
  try {
    const updated = yield call(services.saveProfile, payload)
    yield put(actions.saveProfileSuccessful(updated))
  } catch (error) {
    yield put(actions.saveProfileFailure(error))
  }
}

export function * updateUser ({ payload }) {
  try {
    const id = yield select(state => state.auth.user.id)
    const updated = yield call(services.updateUser, { id: id, params: payload })
    yield put(actions.updateUserSuccessful(updated))
  } catch (error) {
    yield put(actions.updateUserFailure(error))
  }
}

export function * completeRegistration ({ payload }) {
  try {
    const id = yield select(state => state.auth.user.id)
    const updated = yield call(services.updateUser, { id: id, params: payload })
    yield call(services.setRole)
    yield put(actions.getRoles())
    yield put(actions.updateUserSuccessful(updated))
    yield history.push('/')
  } catch (error) {
    console.log(error.response)
    if (has(error.response.data, 'taxpayer_number')) openSingleNotification('error', 'CPF/CNPJ já existente', 'O CPF/CNPJ enviado já esta cadastrado.')
    else openSingleNotification('error', 'Cadastro não efetuado', 'Não foi possível completar seu cadastro no momento.')
    yield put(actions.updateUserFailure(error))
  }
}

// Watchers
export function * watchGetRoles () {
  yield takeLatest(types.GET_ROLES, getRoles)
}

export function * watchSaveProfile () {
  yield takeLatest(types.SAVE_PROFILE, saveProfile)
}

export function * watchUpdateUser () {
  yield takeLatest(types.UPDATE_USER, updateUser)
}

export function * watchFetchAppData () {
  yield takeLatest(types.FETCH_APP_DATA, fetchAppData)
}

export function * watchCompleteRegistration () {
  yield takeLatest(types.COMPLETE_REGISTRATION, completeRegistration)
}

export default function * authSagas () {
  yield all([
    watchFetchAppData(),
    watchGetRoles(),
    watchSaveProfile(),
    watchUpdateUser(),
    watchCompleteRegistration()
  ])
}
