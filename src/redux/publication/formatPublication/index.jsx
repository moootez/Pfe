import { combineReducers } from 'redux'
import conjoint from './conjoint'
import enfantsMineur from './enfantsMineurs'
import bien from './bien'
import identiteDeclarant from './identiteDeclarant'
import { reducer as allFormat } from './getAllFormatPublication'
import { reducer as updateAllFormat } from './updateFormatPublication'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    identiteDeclarant,
    conjoint,
    enfantsMineur,
    bien,
    allFormat,
    updateAllFormat,
})
