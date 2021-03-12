import getGuideSaga from './guide/getGuide'
import editGuideSaga from './guide/editGuide'
import getTextJuridiqueSaga from './textJuridique/getTextJuridique'
import editTextJuridiqueSaga from './textJuridique/editTextJuridique'
import deleteTextJuridiqueSaga from './textJuridique/deleteTextJuridique'
import addTextJuridiqueSaga from './textJuridique/addTextJuridique'
import getLienSaga from './lien/getLien'
import editLienSaga from './lien/editLien'
import deleteLienSaga from './lien/deleteLien'
import addLienSaga from './lien/addLien'
import getActualiteSaga from './actualite/getActualite'
import editActualiteSaga from './actualite/editActualite'
import deleteActualiteSaga from './actualite/deleteActualite'
import addActualiteSaga from './actualite/addActualite'
import getFaqSaga from './faq/getFaq'
import editFaqSaga from './faq/editFaq'
import deleteFaqSaga from './faq/deleteFaq'
import addFaqSaga from './faq/addFaq'
import getRapportContenuSaga from './rapport/getRapport'
import editRapportContenuSaga from './rapport/editRapport'
import deleteRapportContenuSaga from './rapport/deleteRapport'
import addRapportContenuSaga from './rapport/addRapport'

/**
 * export all function saga (API)
 */
const declarantSagas = [
    addFaqSaga,
    deleteFaqSaga,
    editFaqSaga,
    getFaqSaga,
    addActualiteSaga,
    deleteActualiteSaga,
    editActualiteSaga,
    getActualiteSaga,
    addLienSaga,
    deleteLienSaga,
    editLienSaga,
    getLienSaga,
    addTextJuridiqueSaga,
    deleteTextJuridiqueSaga,
    editTextJuridiqueSaga,
    getTextJuridiqueSaga,
    editGuideSaga,
    getGuideSaga,
    getRapportContenuSaga,
    editRapportContenuSaga,
    deleteRapportContenuSaga,
    addRapportContenuSaga,
]

export default declarantSagas
