import { combineReducers } from 'redux'
import filterDeclarations from './getfilterDeclaration'

import { reducer as getResponsableRevenus } from './bien/revenus/getResponsableRevenu/index'
import conjoint from './conjoint'
import enfantsMineur from './enfantsMineurs'
import decBien from './bien'
import interets from './interets'
import { reducer as submitDec } from './submitDecSaisie/index'
import { reducer as scanDec } from './scan/index'

/*
 * render all redux reducers actions
 */

/*
 * render all redux reducers actions
 */
export default combineReducers({
    filterDeclarations,
    getResponsableRevenus,
    enfantsMineur,
    conjoint,
    decBien,
    interets,
    submitDec,
    scanDec,
})
