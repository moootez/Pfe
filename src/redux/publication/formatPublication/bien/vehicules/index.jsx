import { combineReducers } from 'redux'
import { reducer as getVehicules } from './getVehicules'
import { reducer as updateVehicules } from './updateVehicules'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getVehicules,
    updateVehicules,
})
