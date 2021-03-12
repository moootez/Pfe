import { combineReducers } from 'redux'
import { reducer as getFilterEtablissement } from './getFiltreEtablissement'
import { reducer as addEtablissement } from './addEtablissement'
import { reducer as deleteEtablissement } from './deleteEtablissement'
import { reducer as publierEtablissement } from './publierEtablissement'
import { reducer as getFilterEtablissementAssujetti } from './getFilterEtablissementAssujetti'

/*
 * render all redux reducers actions
 */

/*
 * render all redux reducers actions
 */
export default combineReducers({
    getFilterEtablissement,
    addEtablissement,
    deleteEtablissement,
    publierEtablissement,
    getFilterEtablissementAssujetti,
})
