import { combineReducers } from 'redux'
import { reducer as getPrets } from './getPrets'
import { reducer as updatePrets } from './updatePrets'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getPrets,
    updatePrets,
})
