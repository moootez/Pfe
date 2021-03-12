/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addConjointDeclarationsActions, {
    addConjointDeclarationsTypes,
} from '../../../../redux/declaration_grab/conjoint/addConjoint'
import getConjointDeclarartions from '../../../../redux/declaration_grab/conjoint/getConjoint/index'
import { Post } from '../../../../serveur/axios'
import changeStepActions from '../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addConjointDeclarationsSagas({ response }) {
    try {
        const res = yield Post('conjoint/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    addConjointDeclarationsActions.addConjointDeclarationsSuccess(
                        res.data
                    )
                ),
                yield put(
                    getConjointDeclarartions.getConjointRequest(
                        response.declarant
                    )
                ),
                yield put(changeStepActions.changeStepSaisie(1)),
            ])
        } else {
            yield put(
                addConjointDeclarationsActions.addConjointDeclarationsFailure(
                    res.data
                )
            )
        }
    } catch (error) {
        yield put(
            addConjointDeclarationsActions.addConjointDeclarationsFailure(error)
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* addConjointDeclarationsSaga() {
    yield takeLatest(
        addConjointDeclarationsTypes.ADD_CONJOINT_DECLARATIONS_REQUEST,
        addConjointDeclarationsSagas
    )
}
