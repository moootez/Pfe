/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addMembresActions, {
    addMembresTypes,
} from '../../../../../redux/declaration_grab/interets/membres/addMembres/index'
import getMembresActions from '../../../../../redux/declaration_grab/interets/membres/getMembres/index'
import { Post } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addMembresSagas({ response }) {
    try {
        const res = yield Post('member/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addMembresActions.addMembresSuccess(res.data)),
                yield put(
                    getMembresActions.getMembresRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(5)
                ),
            ])
        } else {
            yield put(addMembresActions.addMembresFailure(res.data))
        }
    } catch (error) {
        yield put(addMembresActions.addMembresFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addMembresSaga() {
    yield takeLatest(addMembresTypes.ADD_MEMBRES_REQUEST, addMembresSagas)
}
