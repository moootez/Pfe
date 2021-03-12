/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getRevenusActions, {
    getRevenusTypes,
} from '../../../../../redux/declaration_grab/bien/revenus/getRevenus/index'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getRevenusSagas({ response }) {
    try {
        const res = yield Get(`revenue/${response}`)
        if (res.status === 200) {
            yield put(getRevenusActions.getRevenusSuccess(res.data))
        } else {
            yield put(getRevenusActions.getRevenusFailure(res.data))
        }
    } catch (error) {
        yield put(getRevenusActions.getRevenusFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getRevenusSaga() {
    yield takeLatest(getRevenusTypes.GET_REVENUS_REQUEST, getRevenusSagas)
}
