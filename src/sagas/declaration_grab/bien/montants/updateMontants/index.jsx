/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updateMontantsActions, {
    updateMontantsTypes,
} from '../../../../../redux/declaration_grab/bien/montants/updateMontants/index'
import getMontantsActions from '../../../../../redux/declaration_grab/bien/montants/getMontants/index'
import { Patch } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateMontantsSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `amountfinancial/${response[0].declaration}`,
            response
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updateMontantsActions.updateMontantsSuccess(
                        responseEdit.data
                    )
                ),
                yield put(
                    getMontantsActions.getMontantsRequest(
                        response[0].declaration
                    )
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(9)
                ),
            ])
        } else {
            yield put(
                updateMontantsActions.updateMontantsFailure(responseEdit.data)
            )
        }
    } catch (error) {
        yield put(updateMontantsActions.updateMontantsFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateMontantsSaga() {
    yield takeLatest(
        updateMontantsTypes.UPDATE_MONTANTS_REQUEST,
        updateMontantsSagas
    )
}
