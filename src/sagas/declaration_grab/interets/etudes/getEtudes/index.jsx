/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getEtudesActions, {
    getEtudesTypes,
} from '../../../../../redux/declaration_grab/interets/etudes/getEtudes/index'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getEtudesSagas({ response }) {
    try {
        const res = yield Get(`statementstudy/${response}`)
        if (res.status === 200) {
            yield put(getEtudesActions.getEtudesSuccess(res.data))
        } else {
            yield put(getEtudesActions.getEtudesFailure(res.data))
        }
    } catch (error) {
        yield put(getEtudesActions.getEtudesFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getEtudesSaga() {
    yield takeLatest(getEtudesTypes.GET_ETUDES_REQUEST, getEtudesSagas)
}
