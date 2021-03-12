import { combineReducers } from 'redux'
import { reducer as publierDeclaration } from './publierDeclaration'
import { reducer as publierDeclarant } from './publierDeclarant'
import formatPublication from './formatPublication'

/*
 * render all redux reducers actions
 */

/*
 * render all redux reducers actions
 */
export default combineReducers({
    publierDeclaration,
    publierDeclarant,
    formatPublication,
})
