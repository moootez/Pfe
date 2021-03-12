import { takeLatest, put, all } from 'redux-saga/effects'
import getHistoryByIDActions, {
    getHistoryByIDTypes,
} from '../../../redux/history/historyById'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getHistoryByIDSagas({ response }) {
    const { id, type, ...payload } = response
    try {
        const res = yield Post(`history/${type}/${id}`, payload)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    getHistoryByIDActions.getHistoryByIDSuccess(res.data)
                ),
            ])
        } else {
            yield put(getHistoryByIDActions.getHistoryByIDFailure(res))
        }
    } catch (error) {
        yield put(getHistoryByIDActions.getHistoryByIDFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getHistoryByIDSaga() {
    yield takeLatest(
        getHistoryByIDTypes.GET_HISTORY_BY_ID_REQUEST,
        getHistoryByIDSagas
    )
}
