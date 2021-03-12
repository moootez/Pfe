/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getMembresActions, {
    getMembresTypes,
} from '../../../../../redux/declaration_grab/interets/membres/getMembres/index'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getMembresSagas({ response }) {
    try {
        const res = yield Get(`member/${response}`)
        if (res.status === 200) {
            yield put(getMembresActions.getMembresSuccess(res.data))
        } else {
            yield put(getMembresActions.getMembresFailure(res.data))
        }
    } catch (error) {
        yield put(getMembresActions.getMembresFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getMembresSaga() {
    yield takeLatest(getMembresTypes.GET_MEMBRES_REQUEST, getMembresSagas)
}
