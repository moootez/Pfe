/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getAnimauxActions, {
    getAnimauxTypes,
} from '../../../../../redux/declaration_grab/bien/animaux/getAnimaux/index'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getAnimauxSagas({ response }) {
    try {
        const res = yield Get(`animaux/${response}`)
        if (res.status === 200) {
            yield put(getAnimauxActions.getAnimauxSuccess(res.data))
        } else {
            yield put(getAnimauxActions.getAnimauxFailure(res.data))
        }
    } catch (error) {
        yield put(getAnimauxActions.getAnimauxFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getAnimauxSaga() {
    yield takeLatest(getAnimauxTypes.GET_ANIMAUX_REQUEST, getAnimauxSagas)
}
