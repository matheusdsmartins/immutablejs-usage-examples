import createReducer from '../createReducer'
import * as types from './constants'

const initialState = {
  current: 'default'
}

const theme = createReducer(initialState, {
  [types.CHANGE_THEME]: (state, action) => ({
    ...state,
    current: action.payload
  })
})

export default theme
