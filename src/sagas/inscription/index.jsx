import { getFilterInscriptionSaga } from './getFiltreInscription'
import changeInscriptionSaga from './validateInscription'
import refusInscriptionSaga from './refusInscription'

/**
 * export all function saga (API)
 */
const inscriptionSagas = [
    getFilterInscriptionSaga,
    changeInscriptionSaga,
    refusInscriptionSaga,
]

export default inscriptionSagas
