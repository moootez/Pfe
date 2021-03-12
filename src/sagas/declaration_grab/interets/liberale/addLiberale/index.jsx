/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addLiberaleActions, {
    addLiberaleTypes,
} from '../../../../../redux/declaration_grab/interets/liberale/addLiberale/index'
import getLiberaleActions from '../../../../../redux/declaration_grab/interets/liberale/getLiberale/index'
import { Post } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addLiberaleSagas({ response }) {
    try {
        const res = yield Post('professionliberal/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addLiberaleActions.addLiberaleSuccess(res.data)),
                yield put(
                    getLiberaleActions.getLiberaleRequest(
                        response[0].declaration
                    )
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(2)
                ),
            ])
        } else {
            yield put(addLiberaleActions.addLiberaleFailure(res.data))
        }
    } catch (error) {
        yield put(addLiberaleActions.addLiberaleFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addLiberaleSaga() {
    yield takeLatest(addLiberaleTypes.ADD_LIBERALE_REQUEST, addLiberaleSagas)
}
