import { combineReducers } from 'redux'
import { reducer as getFiltreInscription } from './getFiltreInscription'
import { reducer as updateInscription } from './validateInscription'

/*
 * render all redux reducers actions
 */

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getFiltreInscription,
    updateInscription,
})
