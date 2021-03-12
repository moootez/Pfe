import { combineReducers } from 'redux'
import { reducer as getAllHistory } from './allHistory'
import { reducer as getHistoryByID } from './historyById'

/*
 * render all redux reducers actions
 */

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getAllHistory,
    getHistoryByID,
})
