/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addActConjointActions, {
    addActConjointTypes,
} from '../../../../../redux/declaration_grab/interets/actConjoint/addActConjoint/index'
import getActConjointActions from '../../../../../redux/declaration_grab/interets/actConjoint/getActConjoint/index'
import { Post } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addActConjointSagas({ response }) {
    try {
        const res = yield Post('activityforwife/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    addActConjointActions.addActConjointSuccess(res.data)
                ),
                yield put(
                    getActConjointActions.getActConjointRequest(
                        response[0].declaration
                    )
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(4)
                ),
            ])
        } else {
            yield put(addActConjointActions.addActConjointFailure(res.data))
        }
    } catch (error) {
        yield put(addActConjointActions.addActConjointFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addActConjointSaga() {
    yield takeLatest(
        addActConjointTypes.ADD_ACT_CONJOINT_REQUEST,
        addActConjointSagas
    )
}
