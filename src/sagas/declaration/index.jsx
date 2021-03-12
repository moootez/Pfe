import addDeclarantSaga from './addDeclarant'
import getDeclarantByCinOrPassSaga from './getDeclarantByCinOrPass'
import addDeclarationSaga from './addDeclaration'
import { getAllDeclarationsSaga } from './getAllDeclarations'
import getReceivedSaga from './getReceived'
import { nouveauRapprochementSaga } from './nouveauRapprochement'
import { getDeclarationSaga } from './declarant'
import addDeclarationAssujettiSaga from './addDeclarationAssujetti'
import deleteDeclarationAssujettiSaga from './deleteDeclarationAssujetti'
import getReceivedRecuSaga from './getReceivedRecu'
import addDeclarationCoursDesComptesSaga from './addDeclarationCoursDesComptes'

/**
 * export all function saga (API)
 */
const declarantSagas = [
    getReceivedRecuSaga,
    getDeclarantByCinOrPassSaga,
    addDeclarationSaga,
    getReceivedSaga,
    getAllDeclarationsSaga,
    addDeclarantSaga,
    nouveauRapprochementSaga,
    getDeclarationSaga,
    addDeclarationAssujettiSaga,
    deleteDeclarationAssujettiSaga,
    addDeclarationCoursDesComptesSaga,
]

export default declarantSagas
