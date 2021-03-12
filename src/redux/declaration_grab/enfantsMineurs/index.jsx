import { combineReducers } from 'redux'
import { reducer as getEnfantMineurDeclaration } from './getEnfantMineur'
import { reducer as addEnfantMineurDeclaration } from './addEnfantMineur'
import { reducer as updateEnfantMineurDeclaration } from './updateEnfantMineur'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getEnfantMineurDeclaration,
    addEnfantMineurDeclaration,
    updateEnfantMineurDeclaration,
})
