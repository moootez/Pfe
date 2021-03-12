import { combineReducers } from 'redux'
import { reducer as getLiberale } from './getLiberale'
import { reducer as addLiberale } from './addLiberale'
import { reducer as updateLiberale } from './updateLiberale'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getLiberale,
    addLiberale,
    updateLiberale,
})
