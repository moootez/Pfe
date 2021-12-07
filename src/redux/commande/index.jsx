import { combineReducers } from 'redux'
import { reducer as getAllProduct } from './getAllProduct'
import { reducer as newCommande } from './newCommande'
import { reducer as getCommande } from './getCommande'
import { reducer as validerCommande } from './validerCommande'
import { reducer as uploadCommande } from './uploadCommande'
import { reducer as dupliquerCommande } from './dupliquerCommande'
import { reducer as exportPdf } from './exportPdf'
import { reducer as editCommande } from './editCommande'

/*
 * render all redux reducers actions
 */

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getAllProduct,
    newCommande,
    getCommande,
    validerCommande,
    uploadCommande,
    dupliquerCommande,
    exportPdf,
    editCommande,
})
