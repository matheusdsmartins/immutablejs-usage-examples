import * as types from './constants'

export const changeTheme = theme => ({
  type: types.CHANGE_THEME,
  payload: theme
})
