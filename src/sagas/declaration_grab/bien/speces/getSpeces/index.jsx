/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getSpecesActions, {
    getSpecesTypes,
} from '../../../../../redux/declaration_grab/bien/speces/getSpeces/index'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getSpecesSagas({ response }) {
    try {
        const res = yield Get(`fundsspecies/${response}`)
        if (res.status === 200) {
            yield put(getSpecesActions.getSpecesSuccess(res.data))
        } else {
            yield put(getSpecesActions.getSpecesFailure(res.data))
        }
    } catch (error) {
        yield put(getSpecesActions.getSpecesFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getSpecesSaga() {
    yield takeLatest(getSpecesTypes.GET_SPECES_REQUEST, getSpecesSagas)
}
