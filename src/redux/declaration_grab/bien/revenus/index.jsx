import { combineReducers } from 'redux'
import { reducer as getRevenus } from './getRevenus'
import { reducer as addRevenus } from './addRevenus'
import { reducer as updateRevenus } from './updateRevenus'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getRevenus,
    addRevenus,
    updateRevenus,
})
