/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addSalarieActions, {
    addSalarieTypes,
} from '../../../../../redux/declaration_grab/interets/salarie/addSalarie/index'
import getSalarieActions from '../../../../../redux/declaration_grab/interets/salarie/getSalarie/index'
import { Post } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addSalarieSagas({ response }) {
    try {
        const res = yield Post('salaried/new', response)
        if (res.status === 200 || res.status === 201 || res.status === 202) {
            yield all([
                yield put(addSalarieActions.addSalarieSuccess(res.data)),
                yield put(
                    getSalarieActions.getSalarieRequest(response[0].declaration)
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(3)
                ),
            ])
        } else {
            yield put(addSalarieActions.addSalarieFailure(res.data))
        }
    } catch (error) {
        yield put(addSalarieActions.addSalarieFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addSalarieSaga() {
    yield takeLatest(addSalarieTypes.ADD_SALARIE_REQUEST, addSalarieSagas)
}
