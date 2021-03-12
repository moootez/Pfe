import { combineReducers } from 'redux'
import { reducer as getSalarie } from './getSalarie'
import { reducer as addSalarie } from './addSalarie'
import { reducer as updateSalarie } from './updateSalarie'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getSalarie,
    addSalarie,
    updateSalarie,
})
