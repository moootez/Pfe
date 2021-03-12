import { takeLatest, put, all } from 'redux-saga/effects'
import getLienActions, {
    getLienTypes,
} from '../../../../redux/pageCms/lien/getLien'
import { Get } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 */
function* getLienSagas() {
    try {
        const res = yield Get(`lien/all`)
        if (res.status === 200 || res.status === 201) {
            yield all([yield put(getLienActions.getLienSuccess(res.data))])
        } else {
            yield put(getLienActions.getLienFailure(res))
        }
    } catch (error) {
        yield put(getLienActions.getLienFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getLienSaga() {
    yield takeLatest(getLienTypes.GET_LIEN_REQUEST, getLienSagas)
}
