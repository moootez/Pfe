import { getFilterEtablissementSaga } from './getFilterEtablissement'
import { addEtablissementSaga } from './addEtablissement/index'
import { publierEtablissementSaga } from './publierEtablissement/index'
import deleteEtablissementSaga from './deleteEtablissement/index'
import getFilterEtablissementAssujetti from './getFilterEtablissementAssujetti'

/**
 * export all function saga (API)
 */
const etablissementSagas = [
    getFilterEtablissementSaga,
    addEtablissementSaga,
    publierEtablissementSaga,
    deleteEtablissementSaga,
    getFilterEtablissementAssujetti,
]

export default etablissementSagas
