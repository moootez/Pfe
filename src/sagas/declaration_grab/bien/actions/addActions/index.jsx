/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addActionsActions, {
    addActionsTypes,
} from '../../../../../redux/declaration_grab/bien/actions/addActions/index'
import getActionsActions from '../../../../../redux/declaration_grab/bien/actions/getActions/index'
import { Post } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addActionsSagas({ response }) {
    try {
        const res = yield Post('action/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addActionsActions.addActionsSuccess(res.data)),
                yield put(
                    getActionsActions.getActionsRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(4)
                ),
            ])
        } else {
            yield put(addActionsActions.addActionsFailure(res.data))
        }
    } catch (error) {
        yield put(addActionsActions.addActionsFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addActionsSaga() {
    yield takeLatest(addActionsTypes.ADD_ACTIONS_REQUEST, addActionsSagas)
}
