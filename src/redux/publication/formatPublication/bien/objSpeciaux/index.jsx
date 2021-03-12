import { combineReducers } from 'redux'
import { reducer as getObjSpeciaux } from './getObjSpeciaux'
import { reducer as updateObjSpeciaux } from './updateObjSpeciaux'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getObjSpeciaux,
    updateObjSpeciaux,
})
