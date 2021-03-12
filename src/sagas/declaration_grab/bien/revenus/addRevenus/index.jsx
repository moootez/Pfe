/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addRevenusActions, {
    addRevenusTypes,
} from '../../../../../redux/declaration_grab/bien/revenus/addRevenus/index'
import getRevenusActions from '../../../../../redux/declaration_grab/bien/revenus/getRevenus/index'
import { Post } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addRevenusSagas({ response }) {
    try {
        const res = yield Post('revenue/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addRevenusActions.addRevenusSuccess(res.data)),
                yield put(
                    getRevenusActions.getRevenusRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(1)
                ),
            ])
        } else {
            yield put(addRevenusActions.addRevenusFailure(res.data))
        }
    } catch (error) {
        yield put(addRevenusActions.addRevenusFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addRevenusSaga() {
    yield takeLatest(addRevenusTypes.ADD_REVENUS_REQUEST, addRevenusSagas)
}
