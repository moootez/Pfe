import { combineReducers } from 'redux'
import { reducer as getAnimaux } from './getAnimaux'
import { reducer as updateAnimaux } from './updateAnimaux'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getAnimaux,
    updateAnimaux,
})
