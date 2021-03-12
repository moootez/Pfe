/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getCadeauxActions, {
    getCadeauxTypes,
} from '../../../../../redux/declaration_grab/interets/cadeaux/getCadeaux/index'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getCadeauxSagas({ response }) {
    try {
        const res = yield Get(`gift/${response}`)
        if (res.status === 200) {
            yield put(getCadeauxActions.getCadeauxSuccess(res.data))
        } else {
            yield put(getCadeauxActions.getCadeauxFailure(res.data))
        }
    } catch (error) {
        yield put(getCadeauxActions.getCadeauxFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getCadeauxSaga() {
    yield takeLatest(getCadeauxTypes.GET_CADEAUX_REQUEST, getCadeauxSagas)
}
