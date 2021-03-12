import { combineReducers } from 'redux'
import { reducer as getParametres } from './getParametres'
import { reducer as patchParametres } from './patchParametres'

/*
 * render all redux reducers actions
 */

/*
 * render all redux reducers actions
 */
export default combineReducers({
    patchParametres,
    getParametres,
})
