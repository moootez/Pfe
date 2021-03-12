/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updateMembresActions, {
    updateMembresTypes,
} from '../../../../../redux/declaration_grab/interets/membres/updateMembres/index'
import getMembresActions from '../../../../../redux/declaration_grab/interets/membres/getMembres/index'
import { Patch } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateMembresSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `member/${response[0].declaration}`,
            response
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updateMembresActions.updateMembresSuccess(responseEdit.data)
                ),
                yield put(
                    getMembresActions.getMembresRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(5)
                ),
            ])
        } else {
            yield put(
                updateMembresActions.updateMembresFailure(responseEdit.data)
            )
        }
    } catch (error) {
        yield put(updateMembresActions.updateMembresFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateMembresSaga() {
    yield takeLatest(
        updateMembresTypes.UPDATE_MEMBRES_REQUEST,
        updateMembresSagas
    )
}
