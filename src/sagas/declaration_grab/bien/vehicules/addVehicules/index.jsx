/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addVehiculesActions, {
    addVehiculesTypes,
} from '../../../../../redux/declaration_grab/bien/vehicules/AddVehicules/index'
import getVehiculesActions from '../../../../../redux/declaration_grab/bien/vehicules/getVehicules/index'
import { Post } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addVehiculesSagas({ response }) {
    try {
        const res = yield Post('vehicule/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addVehiculesActions.addVehiculesSuccess(res.data)),
                yield put(
                    getVehiculesActions.getVehiculesRequest(
                        response[0].declaration
                    )
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(3)
                ),
            ])
        } else {
            yield put(addVehiculesActions.addVehiculesFailure(res.data))
        }
    } catch (error) {
        yield put(addVehiculesActions.addVehiculesFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addVehiculesSaga() {
    yield takeLatest(addVehiculesTypes.ADD_VEHICULES_REQUEST, addVehiculesSagas)
}
