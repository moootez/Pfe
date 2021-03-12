import { takeLatest, put, all } from 'redux-saga/effects'
import publierStatistiqueActions, {
    publierStatistiqueTypes,
} from '../../../redux/statistique/publierStatistique'
import { Patch } from '../../../serveur/axios'
// import alertActions from '../../../redux/alert'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* publierStatistiqueSagas({ response }) {
    try {
        const res = yield Patch('statistique-graphe/published', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    publierStatistiqueActions.publierStatistiqueSuccess(
                        res.data
                    )
                ),
            ])
        } else {
            yield put(publierStatistiqueActions.publierStatistiqueFailure(res))
        }
    } catch (error) {
        yield put(publierStatistiqueActions.publierStatistiqueFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* publierStatistiqueSaga() {
    yield takeLatest(
        publierStatistiqueTypes.PUBLIER_STATISTIQUE_REQUEST,
        publierStatistiqueSagas
    )
}
