import { combineReducers } from 'redux'
import { reducer as getEnfantMineurPublication } from './getEnfantMineur'
import { reducer as updateEnfantMineurPublication } from './updateEnfantMineur'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getEnfantMineurPublication,
    updateEnfantMineurPublication,
})
