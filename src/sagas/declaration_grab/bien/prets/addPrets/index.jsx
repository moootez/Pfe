/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addPretsActions, {
    addPretsTypes,
} from '../../../../../redux/declaration_grab/bien/prets/addPrets/index'
import getPretsActions from '../../../../../redux/declaration_grab/bien/prets/getPrets/index'
import { Post } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addPretsSagas({ response }) {
    try {
        const res = yield Post('preacquired/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addPretsActions.addPretsSuccess(res.data)),
                yield put(
                    getPretsActions.getPretsRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(12)
                ),
                // yield put(changeStepActions.changeStepDeclaration(0)),
            ])
        } else {
            yield put(addPretsActions.addPretsFailure(res.data))
        }
    } catch (error) {
        yield put(addPretsActions.addPretsFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addPretsSaga() {
    yield takeLatest(addPretsTypes.ADD_PRETS_REQUEST, addPretsSagas)
}
