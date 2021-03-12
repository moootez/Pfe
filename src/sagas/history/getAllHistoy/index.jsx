import { takeLatest, put, all } from 'redux-saga/effects'
import getHistoryActions, {
    getHistoryTypes,
} from '../../../redux/history/allHistory'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getHistorySagas({ response }) {
    try {
        const { payload, path } = response
        const res = yield Post(path, payload)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(getHistoryActions.getHistorySuccess(res.data)),
            ])
        } else {
            yield put(getHistoryActions.getHistoryFailure(res))
        }
    } catch (error) {
        yield put(getHistoryActions.getHistoryFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getHistorySaga() {
    yield takeLatest(getHistoryTypes.GET_HISTORY_REQUEST, getHistorySagas)
}
