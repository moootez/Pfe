/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updateAnimauxActions, {
    updateAnimauxTypes,
} from '../../../../../redux/declaration_grab/bien/animaux/updateAnimaux/index'
import getAnimauxActions from '../../../../../redux/declaration_grab/bien/animaux/getAnimaux/index'
import { Patch } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateAnimauxSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `animaux/${response[0].declaration}`,
            response
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updateAnimauxActions.updateAnimauxSuccess(responseEdit.data)
                ),
                yield put(
                    getAnimauxActions.getAnimauxRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(8)
                ),
            ])
        } else {
            yield put(
                updateAnimauxActions.updateAnimauxFailure(responseEdit.data)
            )
        }
    } catch (error) {
        yield put(updateAnimauxActions.updateAnimauxFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateAnimauxSaga() {
    yield takeLatest(
        updateAnimauxTypes.UPDATE_ANIMAUX_REQUEST,
        updateAnimauxSagas
    )
}
