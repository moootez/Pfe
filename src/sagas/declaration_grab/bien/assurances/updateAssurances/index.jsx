/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updateAssurancesActions, {
    updateAssurancesTypes,
} from '../../../../../redux/declaration_grab/bien/assurances/updateAssurances/index'
import getAssurancesActions from '../../../../../redux/declaration_grab/bien/assurances/getAssurances/index'
import { Patch } from '../../../../../serveur/axios'
import changeStepActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateAssurancesSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `contractinsurance/${response[0].declaration}`,
            response
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updateAssurancesActions.updateAssurancesSuccess(
                        responseEdit.data
                    )
                ),
                yield put(
                    getAssurancesActions.getAssurancesRequest(
                        response[0].declaration
                    )
                ),
                yield put(changeStepActions.changeStepSaisie(3)),
                yield put(changeStepActions.changeStepDeclaration(0)),
            ])
        } else {
            yield put(
                updateAssurancesActions.updateAssurancesFailure(
                    responseEdit.data
                )
            )
        }
    } catch (error) {
        yield put(updateAssurancesActions.updateAssurancesFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateAssurancesSaga() {
    yield takeLatest(
        updateAssurancesTypes.UPDATE_ASSURANCES_REQUEST,
        updateAssurancesSagas
    )
}
