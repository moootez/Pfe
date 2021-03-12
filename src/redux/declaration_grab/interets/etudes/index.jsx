import { combineReducers } from 'redux'
import { reducer as getEtudes } from './getEtudes'
import { reducer as addEtudes } from './addEtudes'
import { reducer as updateEtudes } from './updateEtudes'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getEtudes,
    addEtudes,
    updateEtudes,
})
