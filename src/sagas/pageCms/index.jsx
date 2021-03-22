import getActualiteSaga from './actualite/getActualite'
import editActualiteSaga from './actualite/editActualite'
import deleteActualiteSaga from './actualite/deleteActualite'
import addActualiteSaga from './actualite/addActualite'

/**
 * export all function saga (API)
 */
const declarantSagas = [
    addActualiteSaga,
    deleteActualiteSaga,
    editActualiteSaga,
    getActualiteSaga,
]

export default declarantSagas
