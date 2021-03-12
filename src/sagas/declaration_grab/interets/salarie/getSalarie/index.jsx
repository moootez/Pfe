/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getSalarieActions, {
    getSalarieTypes,
} from '../../../../../redux/declaration_grab/interets/salarie/getSalarie/index'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getSalarieSagas({ response }) {
    try {
        const res = yield Get(`salaried/${response}`)
        if (res.status === 200) {
            yield put(getSalarieActions.getSalarieSuccess(res.data))
        } else {
            yield put(getSalarieActions.getSalarieFailure(res.data))
        }
    } catch (error) {
        yield put(getSalarieActions.getSalarieFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getSalarieSaga() {
    yield takeLatest(getSalarieTypes.GET_SALARIE_REQUEST, getSalarieSagas)
}
