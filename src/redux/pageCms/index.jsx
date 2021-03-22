import { combineReducers } from 'redux'
import { reducer as Actualite } from './actualite/getActualite'
import { reducer as editActualite } from './actualite/editActualite'
import { reducer as addActualite } from './actualite/addActualite'
import { reducer as deleteActualite } from './actualite/deleteActualite'

/*
 * render all redux reducers actions
 */

/*
 * render all redux reducers actions
 */
export default combineReducers({
    deleteActualite,
    addActualite,
    Actualite,
    editActualite,
})
