/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getRapportActions, {
    getRapportTypes,
} from '../../../redux/rapport/getRapport/index'
import { Get } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getRapportSagas({ response }) {
    try {
        const res = yield Get(`rapport/${response}`)
        if (res.status === 200) {
            yield put(getRapportActions.getRapportSuccess(res.data.data))
        } else {
            yield put(getRapportActions.getRapportFailure(res.data.data))
        }
    } catch (error) {
        yield put(getRapportActions.getRapportFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getRapportSaga() {
    yield takeLatest(getRapportTypes.GET_RAPPORT_REQUEST, getRapportSagas)
}
