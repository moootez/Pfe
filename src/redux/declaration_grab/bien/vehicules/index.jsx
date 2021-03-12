import { combineReducers } from 'redux'
import { reducer as getVehicules } from './getVehicules'
import { reducer as addVehicules } from './AddVehicules'
import { reducer as updateVehicules } from './updateVehicules'
import { reducer as isExistMatricule } from './isExistMatricule'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getVehicules,
    addVehicules,
    updateVehicules,
    isExistMatricule,
})
