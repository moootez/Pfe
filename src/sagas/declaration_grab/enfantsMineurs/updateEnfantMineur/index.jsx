/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updateEnfantActions, {
    updateEnfantTypes,
} from '../../../../redux/declaration_grab/enfantsMineurs/updateEnfantMineur/index'
import getEnfantmieurActions from '../../../../redux/declaration_grab/enfantsMineurs/getEnfantMineur/index'
import { Patch } from '../../../../serveur/axios'
import changeStepActions from '../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateEnfantSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `enfant/edit/${response[0].declarant}`,
            response
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updateEnfantActions.updateEnfantSuccess(responseEdit.data)
                ),
                yield put(
                    getEnfantmieurActions.getEnfantRequest(
                        response[0].declarant
                    )
                ),
                yield put(changeStepActions.changeStepSaisie(2)),
                yield put(changeStepActions.changeStepDeclaration(0)),
            ])
        } else {
            yield put(
                updateEnfantActions.updateEnfantFailure(responseEdit.data)
            )
        }
    } catch (error) {
        yield put(updateEnfantActions.updateEnfantFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateEnfantSaga() {
    yield takeLatest(updateEnfantTypes.UPDATE_ENFANT_REQUEST, updateEnfantSagas)
}
