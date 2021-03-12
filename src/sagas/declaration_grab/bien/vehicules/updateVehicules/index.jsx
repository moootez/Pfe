/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updateVehiculesActions, {
    updateVehiculesTypes,
} from '../../../../../redux/declaration_grab/bien/vehicules/updateVehicules/index'
import getVehiculesActions from '../../../../../redux/declaration_grab/bien/vehicules/getVehicules/index'
import { Patch } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateVehiculesSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `vehicule/${response[0].declaration}`,
            response
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updateVehiculesActions.updateVehiculesSuccess(
                        responseEdit.data
                    )
                ),
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
            yield put(
                updateVehiculesActions.updateVehiculesFailure(responseEdit.data)
            )
        }
    } catch (error) {
        yield put(updateVehiculesActions.updateVehiculesFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateVehiculesSaga() {
    yield takeLatest(
        updateVehiculesTypes.UPDATE_VEHICULES_REQUEST,
        updateVehiculesSagas
    )
}
