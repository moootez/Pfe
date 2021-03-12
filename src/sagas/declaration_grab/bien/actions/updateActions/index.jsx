/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updateActionsActions, {
    updateActionsTypes,
} from '../../../../../redux/declaration_grab/bien/actions/updateActions/index'
import getActionsActions from '../../../../../redux/declaration_grab/bien/actions/getActions/index'
import { Patch } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateActionsSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `action/${response[0].declaration}`,
            response
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updateActionsActions.updateActionsSuccess(responseEdit.data)
                ),
                yield put(
                    getActionsActions.getActionsRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(4)
                ),
            ])
        } else {
            yield put(
                updateActionsActions.updateActionsFailure(responseEdit.data)
            )
        }
    } catch (error) {
        yield put(updateActionsActions.updateActionsFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateActionsSaga() {
    yield takeLatest(
        updateActionsTypes.UPDATE_ACTIONS_REQUEST,
        updateActionsSagas
    )
}
