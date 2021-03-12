import { takeLatest, put, all } from 'redux-saga/effects'
import nbrDecParTempsTraitementActions, {
    nbrDecParTempsTraitementTypes,
} from '../../redux/tableauDeBord/nbrDecParTempsTraitement'
import { Post } from '../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* nbrDecParTempsTraitementSagas({ response }) {
    console.log('response', response)
    try {
        const res = yield Post(`dashbord/list/temps_traitement`, response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    nbrDecParTempsTraitementActions.nbrDecParTempsTraitementSuccess(
                        res.data
                    )
                ),
            ])
        } else {
            yield put(
                nbrDecParTempsTraitementActions.nbrDecParTempsTraitementFailure(
                    res
                )
            )
        }
    } catch (error) {
        yield put(
            nbrDecParTempsTraitementActions.nbrDecParTempsTraitementFailure(
                error
            )
        )
    }
}

/**
 * appele à la fonction with key action
 */
export default function* nbrDecParTempsTraitementSaga() {
    yield takeLatest(
        nbrDecParTempsTraitementTypes.NBR_DEC_PAR_TEMPS_TRAITEMENT_REQUEST,
        nbrDecParTempsTraitementSagas
    )
}
