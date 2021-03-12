import addRapportSaga from './saisie/index'
import getRapportSaga from './getRapport/index'
import validerRapportSaga from './validerRapport/index'
import exportRapportSaga from './exportRapport/index'
import getAllRapportSaga from './getAllRapport/index'
import getRapportByRubriqueSaga from './getRapportByRubrique/index'

/**
 * export all function saga (API)
 */
const declarantSagas = [
    addRapportSaga,
    getRapportSaga,
    validerRapportSaga,
    exportRapportSaga,
    getAllRapportSaga,
    getRapportByRubriqueSaga,
]

export default declarantSagas
