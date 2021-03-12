import { combineReducers } from 'redux'
import { reducer as getCertif } from './getCertif'
import { reducer as cryptosign } from './cryptosign'
import { reducer as getInfo } from './getInfo'
import { reducer as validerCertif } from './validerCertif'
/*
 * render all redux reducers actions
 */

/*
 * render all redux reducers actions
 */
export default combineReducers({
    validerCertif,
    getInfo,
    cryptosign,
    getCertif,
})
