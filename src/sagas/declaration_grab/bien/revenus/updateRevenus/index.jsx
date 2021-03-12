/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updateRevenusActions, {
    updateRevenusTypes,
} from '../../../../../redux/declaration_grab/bien/revenus/updateRevenus/index'
import getRevenusActions from '../../../../../redux/declaration_grab/bien/revenus/getRevenus/index'
import { Patch } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateRevenusSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `revenue/${response[0].declaration}`,
            response
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updateRevenusActions.updateRevenusSuccess(responseEdit.data)
                ),
                yield put(
                    getRevenusActions.getRevenusRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(1)
                ),
            ])
        } else {
            yield put(
                updateRevenusActions.updateRevenusFailure(responseEdit.data)
            )
        }
    } catch (error) {
        yield put(updateRevenusActions.updateRevenusFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateRevenusSaga() {
    yield takeLatest(
        updateRevenusTypes.UPDATE_REVENUS_REQUEST,
        updateRevenusSagas
    )
}
