import { combineReducers } from 'redux'
import { reducer as getCadeaux } from './getCadeaux'
import { reducer as addCadeaux } from './addCadeaux'
import { reducer as updateCadeaux } from './updateCadeaux'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getCadeaux,
    addCadeaux,
    updateCadeaux,
})
