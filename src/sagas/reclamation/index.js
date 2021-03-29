import addNewReclamationSaga from './newReclamation'
import getReclamationSaga from './getReclamation'
import updateReclamationSaga from './updateReclamation'

/**
 * export all function saga (API)
 */
const reclamationSagas = [
    addNewReclamationSaga,
    getReclamationSaga,
    updateReclamationSaga,
]

export default reclamationSagas
