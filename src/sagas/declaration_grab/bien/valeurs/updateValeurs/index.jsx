/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updateValeursActions, {
    updateValeursTypes,
} from '../../../../../redux/declaration_grab/bien/valeurs/updateValeurs'
import getValeursActions from '../../../../../redux/declaration_grab/bien/valeurs/getValeurs'
import { Patch } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateValeursSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `otherfurniture/${response[0].declaration}`,
            response
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updateValeursActions.updateValeursSuccess(responseEdit.data)
                ),
                yield put(
                    getValeursActions.getValeursRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(6)
                ),
            ])
        } else {
            yield put(
                updateValeursActions.updateValeursFailure(responseEdit.data)
            )
        }
    } catch (error) {
        yield put(updateValeursActions.updateValeursFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateValeursSaga() {
    yield takeLatest(
        updateValeursTypes.UPDATE_VALEURS_REQUEST,
        updateValeursSagas
    )
}
