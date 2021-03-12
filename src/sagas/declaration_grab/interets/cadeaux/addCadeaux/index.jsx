/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addCadeauxActions, {
    addCadeauxTypes,
} from '../../../../../redux/declaration_grab/interets/cadeaux/addCadeaux/index'
import getCadeauxActions from '../../../../../redux/declaration_grab/interets/cadeaux/getCadeaux/index'
import { Post } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addCadeauxSagas({ response }) {
    try {
        const res = yield Post('gift/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addCadeauxActions.addCadeauxSuccess(res.data)),
                yield put(
                    getCadeauxActions.getCadeauxRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(5)
                ),
            ])
        } else {
            yield put(addCadeauxActions.addCadeauxFailure(res.data))
        }
    } catch (error) {
        yield put(addCadeauxActions.addCadeauxFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addCadeauxSaga() {
    yield takeLatest(addCadeauxTypes.ADD_CADEAUX_REQUEST, addCadeauxSagas)
}
