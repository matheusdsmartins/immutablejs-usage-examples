import * as types from './constants'

export const requestUpdateForm = data => ({
  type: types.UPDATE_FORM,
  payload: data
})

export const updateForm = data => ({
  type: types.UPDATE_FORM,
  payload: data
})
