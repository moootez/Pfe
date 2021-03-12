import { combineReducers } from 'redux'
import { reducer as getImmeubles } from './getImmeubles'
import { reducer as updateImmeubles } from './updateImmeubles'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getImmeubles,
    updateImmeubles,
})
