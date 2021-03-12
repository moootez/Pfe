import { combineReducers } from 'redux'
import revenus from './revenus'
import immeubles from './immeubles'
import vehicules from './vehicules'
import actions from './actions'
import partSocials from './partSocials'
import animaux from './animaux'
import valeurs from './valeurs'
import montants from './montants'
import fonts from './fonts'
import speces from './speces'
import objSpeciaux from './objSpeciaux'
import prets from './prets'
import assurances from './assurances'

/*
 * render all redux reducers actions
 */
export default combineReducers({
    revenus,
    immeubles,
    vehicules,
    actions,
    partSocials,
    animaux,
    valeurs,
    montants,
    fonts,
    speces,
    objSpeciaux,
    assurances,
    prets,
})
