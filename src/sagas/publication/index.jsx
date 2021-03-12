import publierDeclarationSaga from './publierDeclaration/index'
import publierDeclarantSaga from './publierDeclarant'
import getConjointPublicationSaga from './formatPublication/conjoint/getConjoint/index'
import { getEnfantPublicationSaga } from './formatPublication/enfantMineur/getEnfant/index'
import { updateEnfantPublicationSaga } from './formatPublication/enfantMineur/updateEnfant'
import { getIdentiteDeclarantPublicationSaga } from './formatPublication/indentiteDeclarant/getIdentiteDeclarant'
import { updateIdentiteDeclarantPublicationSaga } from './formatPublication/indentiteDeclarant/updateIdentiteDeclarant'
import { getAllFormatPublicationSaga } from './formatPublication/getAllFormatPublication'
import { updateFormatPublicationSaga } from './formatPublication/updateAllFormatPublication'

/**
 * export all function saga (API)
 */
const publicationSagas = [
    publierDeclarationSaga,
    publierDeclarantSaga,
    getConjointPublicationSaga,
    getEnfantPublicationSaga,
    updateEnfantPublicationSaga,
    getIdentiteDeclarantPublicationSaga,
    updateIdentiteDeclarantPublicationSaga,
    getAllFormatPublicationSaga,
    updateFormatPublicationSaga,
]

export default publicationSagas
