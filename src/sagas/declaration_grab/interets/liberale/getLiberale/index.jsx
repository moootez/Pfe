/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getLiberaleActions, {
    getLiberaleTypes,
} from '../../../../../redux/declaration_grab/interets/liberale/getLiberale/index'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getLiberaleSagas({ response }) {
    try {
        const res = yield Get(`professionliberal/${response}`)
        if (res.status === 200) {
            yield put(getLiberaleActions.getLiberaleSuccess(res.data))
        } else {
            yield put(getLiberaleActions.getLiberaleFailure(res.data))
        }
    } catch (error) {
        yield put(getLiberaleActions.getLiberaleFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getLiberaleSaga() {
    yield takeLatest(getLiberaleTypes.GET_LIBERALE_REQUEST, getLiberaleSagas)
}
