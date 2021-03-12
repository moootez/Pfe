import { takeLatest, put, all } from 'redux-saga/effects'
import getReceivedActions, {
    getReceivedTypes,
} from '../../../redux/declaration/getReceived'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getReceivedSagas({ response }) {
    try {
        const res = yield Post(`declaration/downloadReceived/${response}`)
        if (res.status === 200 || res.status === 201) {
            window.open(res.data.result, '_blank')
            yield all([
                yield put(getReceivedActions.getReceivedSuccess(res.data)),
            ])
        } else {
            yield put(getReceivedActions.getReceivedFailure(res))
        }
    } catch (error) {
        yield put(getReceivedActions.getReceivedFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getReceivedSaga() {
    yield takeLatest(getReceivedTypes.GET_RECEIVED_REQUEST, getReceivedSagas)
}
