import { combineReducers } from 'redux'
import { reducer as getValeurs } from './getValeurs'
import { reducer as updateValeurs } from './updateValeurs'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getValeurs,
    updateValeurs,
})
