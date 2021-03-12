import { combineReducers } from 'redux'
import { reducer as addRapport } from './saisie/index'
import { reducer as getRapport } from './getRapport/index'
import { reducer as validerRapport } from './validerRapport/index'
import { reducer as exportRapport } from './exportRapport/index'
import { reducer as getAllRapport } from './getAllRapport/index'
import { reducer as getRapportByRubrique } from './getRapportByRubrique/index'

/*
 * render all redux reducers actions
 */

/*
 * render all redux reducers actions
 */
export default combineReducers({
    addRapport,
    getRapport,
    validerRapport,
    exportRapport,
    getAllRapport,
    getRapportByRubrique,
})
