import { combineReducers } from 'redux'
import { reducer as getMontants } from './getMontants'
import { reducer as addMontants } from './addMontants'
import { reducer as updateMontants } from './updateMontants'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getMontants,
    addMontants,
    updateMontants,
})
