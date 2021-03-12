/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getEnfantActions, {
    getEnfantTypes,
} from '../../../../redux/declaration_grab/enfantsMineurs/getEnfantMineur/index'
import { Get } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getEnfantSagas({ response }) {
    try {
        const res = yield Get(`enfant/${response}`)
        if (res.status === 200) {
            yield put(getEnfantActions.getEnfantSuccess(res.data))
        } else {
            yield put(getEnfantActions.getEnfantFailure(res.data))
        }
    } catch (error) {
        yield put(getEnfantActions.getEnfantFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getEnfantSaga() {
    yield takeLatest(getEnfantTypes.GET_ENFANT_REQUEST, getEnfantSagas)
}
