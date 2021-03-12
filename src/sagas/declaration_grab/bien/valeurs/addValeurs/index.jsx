/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addValeursActions, {
    addValeursTypes,
} from '../../../../../redux/declaration_grab/bien/valeurs/addValeurs'
import getValeursActions from '../../../../../redux/declaration_grab/bien/valeurs/getValeurs'
import { Post } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addValeursSagas({ response }) {
    try {
        const res = yield Post('otherfurniture/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addValeursActions.addValeursSuccess(res.data)),
                yield put(
                    getValeursActions.getValeursRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(6)
                ),
            ])
        } else {
            yield put(addValeursActions.addValeursFailure(res.data))
        }
    } catch (error) {
        yield put(addValeursActions.addValeursFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addValeursSaga() {
    yield takeLatest(addValeursTypes.ADD_VALEURS_REQUEST, addValeursSagas)
}
