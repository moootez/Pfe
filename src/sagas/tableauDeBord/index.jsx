import nbrDecParStatusTraiteesSaga from './nbrDecParStatusTraitees'
import nbrDecParActionSaga from './nbrDecParAction'
import nbrDecParYearSaga from './nbrDecParYear'
import nbrDecParStatusNonTraiteesSaga from './nbrDecParStatusNonTraitees'
import nbrDecParTempsTraitementSaga from './nbrDecParTempsTraitement'
import nbrInscEnAttenteSaga from './nbrInscEnAttente'

/**
 * export all function saga (API)
 */
const declarantSagas = [
    nbrInscEnAttenteSaga,
    nbrDecParTempsTraitementSaga,
    nbrDecParStatusNonTraiteesSaga,
    nbrDecParYearSaga,
    nbrDecParActionSaga,
    nbrDecParStatusTraiteesSaga,
]

export default declarantSagas
