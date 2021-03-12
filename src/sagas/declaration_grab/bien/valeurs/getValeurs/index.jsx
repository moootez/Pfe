/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getValeursActions, {
    getValeursTypes,
} from '../../../../../redux/declaration_grab/bien/valeurs/getValeurs'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getValeursSagas({ response }) {
    try {
        const res = yield Get(`otherfurniture/${response}`)
        if (res.status === 200) {
            yield put(getValeursActions.getValeursSuccess(res.data))
        } else {
            yield put(getValeursActions.getValeursFailure(res.data))
        }
    } catch (error) {
        yield put(getValeursActions.getValeursFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getValeursSaga() {
    yield takeLatest(getValeursTypes.GET_VALEURS_REQUEST, getValeursSagas)
}
