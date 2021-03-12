/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getAssurancesActions, {
    getAssurancesTypes,
} from '../../../../../redux/declaration_grab/bien/assurances/getAssurances/index'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getAssurancesSagas({ response }) {
    try {
        const res = yield Get(`contractinsurance/${response}`)
        if (res.status === 200) {
            yield put(getAssurancesActions.getAssurancesSuccess(res.data))
        } else {
            yield put(getAssurancesActions.getAssurancesFailure(res.data))
        }
    } catch (error) {
        yield put(getAssurancesActions.getAssurancesFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getAssurancesSaga() {
    yield takeLatest(
        getAssurancesTypes.GET_ASSURANCES_REQUEST,
        getAssurancesSagas
    )
}
