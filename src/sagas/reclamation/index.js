import addNewReclamationSaga from './newReclamation'
import getReclamationSaga from './getReclamation'
import updateReclamationSaga from './updateReclamation'
import getReclamationLigneSaga from './getReclamationLigne'

/**
 * export all function saga (API)
 */
const reclamationSagas = [
    addNewReclamationSaga,
    getReclamationLigneSaga,
    getReclamationSaga,
    updateReclamationSaga,
]

export default reclamationSagas
