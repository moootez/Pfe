import { takeLatest, put, all } from 'redux-saga/effects'
import getStatistiqueActions, {
    getStatistiqueTypes,
} from '../../../redux/statistique/getStatistique'
import { Post } from '../../../serveur/axios'
// import alertActions from '../../../redux/alert'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getStatistiqueSagas({ response }) {
    try {
        const res = yield Post(`statistique/all_publiable/${response.type}`, {
            page: response.page,
        })
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    getStatistiqueActions.getStatistiqueSuccess(res.data)
                ),
            ])
        } else {
            yield put(getStatistiqueActions.getStatistiqueFailure(res))
        }
    } catch (error) {
        yield put(getStatistiqueActions.getStatistiqueFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getStatistiqueSaga() {
    yield takeLatest(
        getStatistiqueTypes.GET_STATISTIQUE_REQUEST,
        getStatistiqueSagas
    )
}
