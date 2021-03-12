/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addMontantsActions, {
    addMontantsTypes,
} from '../../../../../redux/declaration_grab/bien/montants/addMontants/index'
import getMontantsActions from '../../../../../redux/declaration_grab/bien/montants/getMontants/index'
import { Post } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addMontantsSagas({ response }) {
    try {
        const res = yield Post('amountfinancial/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addMontantsActions.addMontantsSuccess(res.data)),
                yield put(
                    getMontantsActions.getMontantsRequest(
                        response[0].declaration
                    )
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(9)
                ),
            ])
        } else {
            yield put(addMontantsActions.addMontantsFailure(res.data))
        }
    } catch (error) {
        yield put(addMontantsActions.addMontantsFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addMontantsSaga() {
    yield takeLatest(addMontantsTypes.ADD_MONTANTS_REQUEST, addMontantsSagas)
}
