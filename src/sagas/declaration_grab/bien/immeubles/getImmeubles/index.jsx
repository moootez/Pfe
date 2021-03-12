/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getImmeublesActions, {
    getImmeublesTypes,
} from '../../../../../redux/declaration_grab/bien/immeubles/getImmeubles/index'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getImmeublesSagas({ response }) {
    try {
        const res = yield Get(`immeuble/${response}`)
        if (res.status === 200) {
            yield put(getImmeublesActions.getImmeublesSuccess(res.data))
        } else {
            yield put(getImmeublesActions.getImmeublesFailure(res.data))
        }
    } catch (error) {
        yield put(getImmeublesActions.getImmeublesFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getImmeublesSaga() {
    yield takeLatest(getImmeublesTypes.GET_IMMEUBLES_REQUEST, getImmeublesSagas)
}
