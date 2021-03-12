import { combineReducers } from 'redux'
import { reducer as getAllRoles } from './getAllRoles'
import { reducer as getAllUsers } from './getAllUsers'

/*
 * render all redux reducers actions
 */

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getAllRoles,
    getAllUsers,
})
