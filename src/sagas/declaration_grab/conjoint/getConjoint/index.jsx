/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getConjointActions, {
    getConjointTypes,
} from '../../../../redux/declaration_grab/conjoint/getConjoint/index'
import { Get } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getConjointSagas({ response }) {
    try {
        const res = yield Get(`conjoint/${response}`)
        if (res.status === 200 || res.status === 201) {
            yield put(getConjointActions.getConjointSuccess(res.data))
        } else {
            yield put(getConjointActions.getConjointFailure(res.data))
        }
    } catch (error) {
        yield put(getConjointActions.getConjointFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getConjointSaga() {
    yield takeLatest(getConjointTypes.GET_CONJOINT_REQUEST, getConjointSagas)
}
