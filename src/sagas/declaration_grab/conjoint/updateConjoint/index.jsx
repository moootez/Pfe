/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updateConjointActions, {
    updateConjointTypes,
} from '../../../../redux/declaration_grab/conjoint/updateConjoint'
import getConjointDeclarartions from '../../../../redux/declaration_grab/conjoint/getConjoint/index'
import { Patch } from '../../../../serveur/axios'
import changeStepActions from '../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateConjointSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `conjoint/${response.idConjoint}`,
            response.obj
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updateConjointActions.updateConjointSuccess(
                        responseEdit.data
                    )
                ),
                yield put(
                    getConjointDeclarartions.getConjointRequest(
                        response.obj.declarant
                    )
                ),
                yield put(changeStepActions.changeStepSaisie(1)),
            ])
        } else {
            yield put(
                updateConjointActions.updateConjointFailure(responseEdit.data)
            )
        }
    } catch (error) {
        yield put(updateConjointActions.updateConjointFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateConjointSaga() {
    yield takeLatest(
        updateConjointTypes.UPDATE_CONJOINT_REQUEST,
        updateConjointSagas
    )
}
