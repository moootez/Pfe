/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updateLiberaleActions, {
    updateLiberaleTypes,
} from '../../../../../redux/declaration_grab/interets/liberale/updateLiberale/index'
import getLiberaleActions from '../../../../../redux/declaration_grab/interets/liberale/getLiberale/index'
import { Patch } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateLiberaleSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `professionliberal/${response[0].declaration}`,
            response
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updateLiberaleActions.updateLiberaleSuccess(
                        responseEdit.data
                    )
                ),
                yield put(
                    getLiberaleActions.getLiberaleRequest(
                        response[0].declaration
                    )
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(2)
                ),
            ])
        } else {
            yield put(
                updateLiberaleActions.updateLiberaleFailure(responseEdit.data)
            )
        }
    } catch (error) {
        yield put(updateLiberaleActions.updateLiberaleFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateLiberaleSaga() {
    yield takeLatest(
        updateLiberaleTypes.UPDATE_LIBERALE_REQUEST,
        updateLiberaleSagas
    )
}
