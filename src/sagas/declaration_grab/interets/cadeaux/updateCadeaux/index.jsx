/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updateCadeauxActions, {
    updateCadeauxTypes,
} from '../../../../../redux/declaration_grab/interets/cadeaux/updateCadeaux/index'
import getCadeauxActions from '../../../../../redux/declaration_grab/interets/cadeaux/getCadeaux/index'
import { Patch } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateCadeauxSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `gift/${response[0].declaration}`,
            response
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updateCadeauxActions.updateCadeauxSuccess(responseEdit.data)
                ),
                yield put(
                    getCadeauxActions.getCadeauxRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(5)
                ),
            ])
        } else {
            yield put(
                updateCadeauxActions.updateCadeauxFailure(responseEdit.data)
            )
        }
    } catch (error) {
        yield put(updateCadeauxActions.updateCadeauxFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateCadeauxSaga() {
    yield takeLatest(
        updateCadeauxTypes.UPDATE_CADEAUX_REQUEST,
        updateCadeauxSagas
    )
}
