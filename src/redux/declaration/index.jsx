import { combineReducers } from 'redux'
import { reducer as addDeclarant } from './addDeclarant'
import { reducer as getDeclarantByCinOrPass } from './getDeclarantByCinOrPass'
import { reducer as addDeclaration } from './addDeclaration'
import { reducer as getAllDeclarations } from './getAllDeclarations'
import { reducer as getReceived } from './getReceived'
import { reducer as nouveauRapprochement } from './nouveauRapprochement'
import { reducer as getDeclarant } from './declarant'
import { reducer as addDeclarationAssujetti } from './addDeclarationAssujetti'
import { reducer as deleteDeclarationAssujetti } from './deleteDeclarationAssujetti'
import { reducer as getReceivedRecu } from './getReceivedRecu'
import { reducer as addDeclarationCoursDesComptes } from './addDeclarationCoursDesComptes'

/*
 * render all redux reducers actions
 */

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getReceivedRecu,
    addDeclarant,
    addDeclaration,
    getReceived,
    nouveauRapprochement,
    getAllDeclarations,
    getDeclarantByCinOrPass,
    getDeclarant,
    addDeclarationAssujetti,
    deleteDeclarationAssujetti,
    addDeclarationCoursDesComptes,
})
