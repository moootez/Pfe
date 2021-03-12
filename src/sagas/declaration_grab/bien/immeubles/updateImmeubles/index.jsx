/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updateImmeublesActions, {
    updateImmeublesTypes,
} from '../../../../../redux/declaration_grab/bien/immeubles/updateImmeubles/index'
import getImmeublesActions from '../../../../../redux/declaration_grab/bien/immeubles/getImmeubles/index'
import { Patch } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateImmeublesSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `immeuble/${response[0].declaration}`,
            response
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updateImmeublesActions.updateImmeublesSuccess(
                        responseEdit.data
                    )
                ),
                yield put(
                    getImmeublesActions.getImmeublesRequest(
                        response[0].declaration
                    )
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(2)
                ),
            ])
        } else {
            yield put(
                updateImmeublesActions.updateImmeublesFailure(responseEdit.data)
            )
        }
    } catch (error) {
        yield put(updateImmeublesActions.updateImmeublesFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateImmeublesSaga() {
    yield takeLatest(
        updateImmeublesTypes.UPDATE_IMMEUBLES_REQUEST,
        updateImmeublesSagas
    )
}
