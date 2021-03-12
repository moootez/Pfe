/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updateActConjointActions, {
    updateActConjointTypes,
} from '../../../../../redux/declaration_grab/interets/actConjoint/updateActConjoint/index'
import getActConjointActions from '../../../../../redux/declaration_grab/interets/actConjoint/getActConjoint/index'
import { Patch } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateActConjointSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `activityforwife/${response[0].declaration}`,
            response
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updateActConjointActions.updateActConjointSuccess(
                        responseEdit.data
                    )
                ),
                yield put(
                    getActConjointActions.getActConjointRequest(
                        response[0].declaration
                    )
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(4)
                ),
            ])
        } else {
            yield put(
                updateActConjointActions.updateActConjointFailure(
                    responseEdit.data
                )
            )
        }
    } catch (error) {
        yield put(updateActConjointActions.updateActConjointFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateActConjointSaga() {
    yield takeLatest(
        updateActConjointTypes.UPDATE_ACT_CONJOINT_REQUEST,
        updateActConjointSagas
    )
}
