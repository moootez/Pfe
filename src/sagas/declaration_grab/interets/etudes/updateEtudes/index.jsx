/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updateEtudesActions, {
    updateEtudesTypes,
} from '../../../../../redux/declaration_grab/interets/etudes/updateEtudes/index'
import getEtudesActions from '../../../../../redux/declaration_grab/interets/etudes/getEtudes/index'
import { Patch } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateEtudesSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `statementstudy/${response[0].declaration}`,
            response
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updateEtudesActions.updateEtudesSuccess(responseEdit.data)
                ),
                yield put(
                    getEtudesActions.getEtudesRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(1)
                ),
            ])
        } else {
            yield put(
                updateEtudesActions.updateEtudesFailure(responseEdit.data)
            )
        }
    } catch (error) {
        yield put(updateEtudesActions.updateEtudesFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateEtudesSaga() {
    yield takeLatest(updateEtudesTypes.UPDATE_ETUDES_REQUEST, updateEtudesSagas)
}
