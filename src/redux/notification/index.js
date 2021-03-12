import { combineReducers } from 'redux'
import { reducer as allNotifications } from './getAllNotifications'
import { reducer as editNotifications } from './editNotifications'

/*
 * render all redux reducers actions
 */

/*
 * render all redux reducers actions
 */
export default combineReducers({
    allNotifications,
    editNotifications,
})
