/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getVehiculesActions, {
    getVehiculesTypes,
} from '../../../../../redux/declaration_grab/bien/vehicules/getVehicules/index'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getVehiculesSagas({ response }) {
    try {
        const res = yield Get(`vehicule/${response}`)
        if (res.status === 200) {
            yield put(getVehiculesActions.getVehiculesSuccess(res.data))
        } else {
            yield put(getVehiculesActions.getVehiculesFailure(res.data))
        }
    } catch (error) {
        yield put(getVehiculesActions.getVehiculesFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getVehiculesSaga() {
    yield takeLatest(getVehiculesTypes.GET_VEHICULES_REQUEST, getVehiculesSagas)
}
