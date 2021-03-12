import { combineReducers } from 'redux'
import { reducer as allReferencials } from './getAllReferencial'
import { reducer as allCodePostal } from './getAllCodePostal'
import { reducer as addNewReferencial } from './addNewReferencial'
import { reducer as editReferencial } from './editReferencial'
import { reducer as deleteReferencial } from './deleteReferencial'
import { reducer as getCodePostalByGov } from './getCodePostalByGov'

/*
 * render all redux reducers actions
 */

/*
 * render all redux reducers actions
 */
export default combineReducers({
    allReferencials,
    allCodePostal,
    addNewReferencial,
    editReferencial,
    deleteReferencial,
    getCodePostalByGov,
})
