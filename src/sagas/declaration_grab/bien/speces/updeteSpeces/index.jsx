/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updateSpecesActions, {
    updateSpecesTypes,
} from '../../../../../redux/declaration_grab/bien/speces/updateSpeces/index'
import getSpecesActions from '../../../../../redux/declaration_grab/bien/speces/getSpeces/index'
import { Patch } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateSpecesSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `fundsspecies/${response[0].declaration}`,
            response
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updateSpecesActions.updateSpecesSuccess(responseEdit.data)
                ),
                yield put(
                    getSpecesActions.getSpecesRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(10)
                ),
            ])
        } else {
            yield put(
                updateSpecesActions.updateSpecesFailure(responseEdit.data)
            )
        }
    } catch (error) {
        yield put(updateSpecesActions.updateSpecesFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateSpecesSaga() {
    yield takeLatest(updateSpecesTypes.UPDATE_SPECES_REQUEST, updateSpecesSagas)
}
