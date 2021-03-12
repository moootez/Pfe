import { takeLatest, put, all } from 'redux-saga/effects'
import getParametresActions, {
    getParametresTypes,
} from '../../../redux/parametres/getParametres'
import { Get } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getParametresSagas() {
    try {
        const res = yield Get(`parametre/all`)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(getParametresActions.getParametresSuccess(res.data)),
            ])
        } else {
            yield put(getParametresActions.getParametresFailure(res))
        }
    } catch (error) {
        yield put(getParametresActions.getParametresFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getParametresSaga() {
    yield takeLatest(
        getParametresTypes.GET_PARAMETRES_REQUEST,
        getParametresSagas
    )
}
