/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addImmeublesActions, {
    addImmeublesTypes,
} from '../../../../../redux/declaration_grab/bien/immeubles/addImmeubles/index'
import getImmeublesActions from '../../../../../redux/declaration_grab/bien/immeubles/getImmeubles/index'
import { Post } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addImmeublesSagas({ response }) {
    try {
        const res = yield Post('immeuble/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addImmeublesActions.addImmeublesSuccess(res.data)),
                yield put(
                    getImmeublesActions.getImmeublesRequest(
                        response[0].declaration
                    )
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(2)
                ),
            ])
        } else {
            yield put(addImmeublesActions.addImmeublesFailure(res.data))
        }
    } catch (error) {
        yield put(addImmeublesActions.addImmeublesFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addImmeublesSaga() {
    yield takeLatest(addImmeublesTypes.ADD_IMMEUBLES_REQUEST, addImmeublesSagas)
}
