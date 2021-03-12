/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addAnimauxActions, {
    addAnimauxTypes,
} from '../../../../../redux/declaration_grab/bien/animaux/addAnimaux/index'
import getAnimauxActions from '../../../../../redux/declaration_grab/bien/animaux/getAnimaux/index'
import { Post } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addAnimauxSagas({ response }) {
    try {
        const res = yield Post('animaux/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addAnimauxActions.addAnimauxSuccess(res.data)),
                yield put(
                    getAnimauxActions.getAnimauxRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(8)
                ),
            ])
        } else {
            yield put(addAnimauxActions.addAnimauxFailure(res.data))
        }
    } catch (error) {
        yield put(addAnimauxActions.addAnimauxFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addAnimauxSaga() {
    yield takeLatest(addAnimauxTypes.ADD_ANIMAUX_REQUEST, addAnimauxSagas)
}
