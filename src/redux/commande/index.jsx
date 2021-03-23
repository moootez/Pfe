import { combineReducers } from 'redux'
import { reducer as getAllProduct } from './getAllProduct'
import { reducer as newCommande } from './newCommande'

/*
 * render all redux reducers actions
 */

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getAllProduct,
    newCommande,
})
