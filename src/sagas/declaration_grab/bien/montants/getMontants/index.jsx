/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getMontantsActions, {
    getMontantsTypes,
} from '../../../../../redux/declaration_grab/bien/montants/getMontants/index'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getMontantsSagas({ response }) {
    try {
        const res = yield Get(`amountfinancial/${response}`)
        if (res.status === 200) {
            yield put(getMontantsActions.getMontantsSuccess(res.data))
        } else {
            yield put(getMontantsActions.getMontantsFailure(res.data))
        }
    } catch (error) {
        yield put(getMontantsActions.getMontantsFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getMontantsSaga() {
    yield takeLatest(getMontantsTypes.GET_MONTANTS_REQUEST, getMontantsSagas)
}
