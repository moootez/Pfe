/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addSpecesActions, {
    addSpecesTypes,
} from '../../../../../redux/declaration_grab/bien/speces/addSpeces/index'
import getSpecesActions from '../../../../../redux/declaration_grab/bien/speces/getSpeces/index'
import { Post } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addSpecesSagas({ response }) {
    try {
        const res = yield Post('fundsspecies/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addSpecesActions.addSpecesSuccess(res.data)),
                yield put(
                    getSpecesActions.getSpecesRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(10)
                ),
            ])
        } else {
            yield put(addSpecesActions.addSpecesFailure(res.data))
        }
    } catch (error) {
        yield put(addSpecesActions.addSpecesFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addSpecesSaga() {
    yield takeLatest(addSpecesTypes.ADD_SPECES_REQUEST, addSpecesSagas)
}
