/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updatePretsActions, {
    updatePretsTypes,
} from '../../../../../redux/declaration_grab/bien/prets/updatePrets/index'
import getPretsActions from '../../../../../redux/declaration_grab/bien/prets/getPrets/index'
import { Patch } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updatePretsSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `preacquired/${response[0].declaration}`,
            response
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updatePretsActions.updatePretsSuccess(responseEdit.data)
                ),
                yield put(
                    getPretsActions.getPretsRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(12)
                ),
                // yield put(changeStepActions.changeStepDeclaration(0)),
            ])
        } else {
            yield put(updatePretsActions.updatePretsFailure(responseEdit.data))
        }
    } catch (error) {
        yield put(updatePretsActions.updatePretsFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updatePretsSaga() {
    yield takeLatest(updatePretsTypes.UPDATE_PRETS_REQUEST, updatePretsSagas)
}
