import { combineReducers } from 'redux'
import { reducer as getSpeces } from './getSpeces'
import { reducer as updateSpeces } from './updateSpeces'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getSpeces,
    updateSpeces,
})
