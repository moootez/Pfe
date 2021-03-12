import { takeLatest, put, all } from 'redux-saga/effects'
import getReceivedAvisActions, {
    getReceivedAvisTypes,
} from '../../../redux/declarantInterne/getReceivedAvis'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getReceivedAvisSagas({ response }) {
    try {
        const res = yield Post(`avis/genererpdf/${response.id}`)
        if (res.status === 200 || res.status === 201) {
            window.open(res.data.result, '_blank')
            yield all([
                yield put(
                    getReceivedAvisActions.getReceivedAvisSuccess(res.data)
                ),
            ])
        } else {
            yield put(getReceivedAvisActions.getReceivedAvisFailure(res))
        }
    } catch (error) {
        yield put(getReceivedAvisActions.getReceivedAvisFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getReceivedAvisSaga() {
    yield takeLatest(
        getReceivedAvisTypes.GET_RECEIVED_AVIS_REQUEST,
        getReceivedAvisSagas
    )
}
