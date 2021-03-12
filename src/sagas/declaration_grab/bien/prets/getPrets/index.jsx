/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getPretsActions, {
    getPretsTypes,
} from '../../../../../redux/declaration_grab/bien/prets/getPrets/index'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getPretsSagas({ response }) {
    try {
        const res = yield Get(`preacquired/${response}`)
        if (res.status === 200) {
            yield put(getPretsActions.getPretsSuccess(res.data))
        } else {
            yield put(getPretsActions.getPretsFailure(res.data))
        }
    } catch (error) {
        yield put(getPretsActions.getPretsFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getPretsSaga() {
    yield takeLatest(getPretsTypes.GET_PRETS_REQUEST, getPretsSagas)
}
