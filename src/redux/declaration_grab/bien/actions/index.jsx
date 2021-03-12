import { combineReducers } from 'redux'
import { reducer as getActions } from './getActions'
import { reducer as addActions } from './addActions'
import { reducer as updateActions } from './updateActions'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getActions,
    addActions,
    updateActions,
})
