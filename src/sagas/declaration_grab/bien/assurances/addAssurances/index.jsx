/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addAssurancesActions, {
    addAssurancesTypes,
} from '../../../../../redux/declaration_grab/bien/assurances/addAssurances/index'
import getAssurancesActions from '../../../../../redux/declaration_grab/bien/assurances/getAssurances/index'
import { Post } from '../../../../../serveur/axios'
import changeStepActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addAssurancesSagas({ response }) {
    try {
        const res = yield Post('contractinsurance/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addAssurancesActions.addAssurancesSuccess(res.data)),
                yield put(
                    getAssurancesActions.getAssurancesRequest(
                        response[0].declaration
                    )
                ),
                yield put(changeStepActions.changeStepSaisie(3)),
                yield put(changeStepActions.changeStepDeclaration(0)),
            ])
        } else {
            yield put(addAssurancesActions.addAssurancesFailure(res.data))
        }
    } catch (error) {
        yield put(addAssurancesActions.addAssurancesFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addAssurancesSaga() {
    yield takeLatest(
        addAssurancesTypes.ADD_ASSURANCES_REQUEST,
        addAssurancesSagas
    )
}
