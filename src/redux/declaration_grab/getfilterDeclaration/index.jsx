import { combineReducers } from 'redux'
import { reducer as getFilterDeclaration } from './getFilterDeclarations'
import { reducer as getFilterDeclarationForRapprochement } from './getFilterDecForRapprochement'
import { reducer as getFilterDeclarationEnAttenteDeRapprochement } from './getFilterDecEnAttenteDeRapprochement/index'
import { reducer as getFilterDeclarationForValidation } from './getFilterDecForValidation'
import { reducer as getFilterDeclarationEnAttenteDeValidation } from './getFilterDecEnAttenteDeValidation'
import { reducer as getFilterDeclarationForVerification } from './getFilterDecForVerification'
import { reducer as getFilterDeclarationEnAttenteDeVerification } from './getFilterDecEnAttenteDeVerification'
import { reducer as getFilterDeclarationForPublication } from './getFilterDecForPublication'
import { reducer as getFilterDeclarant } from './getFilterDeclarant'
import { reducer as getFilterDeclarationAssujetti } from './getFilterDeclarationsAssujetti'
import { reducer as confirmeListAssujetti } from './confirmeListAssujetti'
import { reducer as getFilterDeclarationEnAttenteDeValidationCDC } from './getFilterDecEnAttenteDeValidationCDC'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getFilterDeclarationEnAttenteDeValidationCDC,
    getFilterDeclaration,
    getFilterDeclarationForRapprochement,
    getFilterDeclarationEnAttenteDeRapprochement,
    getFilterDeclarationForValidation,
    getFilterDeclarationEnAttenteDeValidation,
    getFilterDeclarationForVerification,
    getFilterDeclarationEnAttenteDeVerification,
    getFilterDeclarationForPublication,
    getFilterDeclarant,
    confirmeListAssujetti,
    getFilterDeclarationAssujetti,
})
