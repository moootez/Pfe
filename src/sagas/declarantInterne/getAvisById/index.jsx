/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getAvisActions, {
    getAvisTypes,
} from '../../../redux/declarantInterne/getAvisById'
import { Get } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 */
function* getAvisSagas({ response }) {
    try {
        const res = yield Get(`avis/consult/${response}`)
        if (res.status === 200) {
            yield all([yield put(getAvisActions.getAvisSuccess(res.data.data))])
        } else {
            yield put(getAvisActions.getAvisFailure(res.data.data))
        }
    } catch (error) {
        yield put(getAvisActions.getAvisFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getAvisSaga() {
    yield takeLatest(getAvisTypes.GET_AVIS_REQUEST, getAvisSagas)
}
