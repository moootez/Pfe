import { combineReducers } from 'redux'
import { reducer as getMontants } from './getMontants'
import { reducer as updateMontants } from './updateMontants'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getMontants,
    updateMontants,
})
