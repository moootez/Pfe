import { combineReducers } from 'redux'
import { reducer as getMembres } from './getMembres'
import { reducer as addMembres } from './addMembres'
import { reducer as updateMembres } from './updateMembres'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getMembres,
    addMembres,
    updateMembres,
})
