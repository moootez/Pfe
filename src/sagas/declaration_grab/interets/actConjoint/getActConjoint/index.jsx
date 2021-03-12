/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getActConjointActions, {
    getActConjointTypes,
} from '../../../../../redux/declaration_grab/interets/actConjoint/getActConjoint/index'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getActConjointSagas({ response }) {
    try {
        const res = yield Get(`activityforwife/${response}`)
        if (res.status === 200) {
            yield put(getActConjointActions.getActConjointSuccess(res.data))
        } else {
            yield put(getActConjointActions.getActConjointFailure(res.data))
        }
    } catch (error) {
        yield put(getActConjointActions.getActConjointFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getActConjointSaga() {
    yield takeLatest(
        getActConjointTypes.GET_ACT_CONJOINT_REQUEST,
        getActConjointSagas
    )
}
