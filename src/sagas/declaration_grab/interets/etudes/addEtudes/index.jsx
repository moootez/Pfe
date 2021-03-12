/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addEtudesActions, {
    addEtudesTypes,
} from '../../../../../redux/declaration_grab/interets/etudes/addEtudes/index'
import getEtudesActions from '../../../../../redux/declaration_grab/interets/etudes/getEtudes/index'
import { Post } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addEtudesSagas({ response }) {
    try {
        const res = yield Post('statementstudy/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addEtudesActions.addEtudesSuccess(res.data)),
                yield put(
                    getEtudesActions.getEtudesRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(1)
                ),
            ])
        } else {
            yield put(addEtudesActions.addEtudesFailure(res.data))
        }
    } catch (error) {
        yield put(addEtudesActions.addEtudesFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addEtudesSaga() {
    yield takeLatest(addEtudesTypes.ADD_ETUDES_REQUEST, addEtudesSagas)
}
