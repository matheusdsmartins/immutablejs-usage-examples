import { createReducer } from 'redux-create-reducer'
import { fromJS } from 'immutable'
import * as types from './constants'

const initialState = fromJS({
  fullName: '',
  age: 0,
  job: ''
})

const example = createReducer(initialState, {
  [types.UPDATE_FORM]: (state, action) => {
    console.log(action.payload.get('fullName'))
    return state
      .set('fullName', action.payload.get('fullName'))
      .set('age', action.payload.get('age'))
      .set('job', action.payload.get('job'))
  }
})

export default example
