import { combineReducers } from 'redux'
import { reducer as guide } from './guide/getGuide'
import { reducer as editGuide } from './guide/editGuide'
import { reducer as TextJuridique } from './textJuridique/getTextJuridique'
import { reducer as editTextJuridique } from './textJuridique/editTextJuridique'
import { reducer as addTextJuridique } from './textJuridique/addTextJuridique'
import { reducer as deleteTextJuridique } from './textJuridique/deleteTextJuridique'
import { reducer as Lien } from './lien/getLien'
import { reducer as editLien } from './lien/editLien'
import { reducer as addLien } from './lien/addLien'
import { reducer as deleteLien } from './lien/deleteLien'
import { reducer as Actualite } from './actualite/getActualite'
import { reducer as editActualite } from './actualite/editActualite'
import { reducer as addActualite } from './actualite/addActualite'
import { reducer as deleteActualite } from './actualite/deleteActualite'
import { reducer as Faq } from './faq/getFaq'
import { reducer as editFaq } from './faq/editFaq'
import { reducer as addFaq } from './faq/addFaq'
import { reducer as deleteFaq } from './faq/deleteFaq'
import { reducer as Rapport } from './rapport/getRapport'
import { reducer as editRapport } from './rapport/editRapport'
import { reducer as addRapport } from './rapport/addRapport'
import { reducer as deleteRapport } from './rapport/deleteRapport'

/*
 * render all redux reducers actions
 */

/*
 * render all redux reducers actions
 */
export default combineReducers({
    deleteFaq,
    addFaq,
    Faq,
    editFaq,
    deleteActualite,
    addActualite,
    Actualite,
    editActualite,
    deleteLien,
    addLien,
    Lien,
    editLien,
    deleteTextJuridique,
    addTextJuridique,
    TextJuridique,
    editTextJuridique,
    guide,
    editGuide,
    Rapport,
    editRapport,
    addRapport,
    deleteRapport,
})
