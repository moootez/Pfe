/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updateSalarieActions, {
    updateSalarieTypes,
} from '../../../../../redux/declaration_grab/interets/salarie/updateSalarie/index'
import getSalarieActions from '../../../../../redux/declaration_grab/interets/salarie/getSalarie/index'
import { Patch } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateSalarieSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `salaried/${response[0].declaration}`,
            response
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updateSalarieActions.updateSalarieSuccess(responseEdit.data)
                ),
                yield put(
                    getSalarieActions.getSalarieRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(3)
                ),
            ])
        } else {
            yield put(
                updateSalarieActions.updateSalarieFailure(responseEdit.data)
            )
        }
    } catch (error) {
        yield put(updateSalarieActions.updateSalarieFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateSalarieSaga() {
    yield takeLatest(
        updateSalarieTypes.UPDATE_SALARIE_REQUEST,
        updateSalarieSagas
    )
}
