import { combineReducers } from 'redux'
import { reducer as getReclamation } from './getReclamation'
import { reducer as newReclamation } from './newReclamation'
import { reducer as updateReclamation } from './updateReclamation'
/*
 * render all redux reducers actions
 */

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getReclamation,
    newReclamation,
    updateReclamation,
})
