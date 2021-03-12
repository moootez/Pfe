/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addObjSpeciauxActions, {
    addObjSpeciauxTypes,
} from '../../../../../redux/declaration_grab/bien/objSpeciaux/addObjSpeciaux/index'
import getObjSpeciauxActions from '../../../../../redux/declaration_grab/bien/objSpeciaux/getObjSpeciaux/index'
import { Post } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addObjSpeciauxSagas({ response }) {
    try {
        const res = yield Post('objectprecious/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    addObjSpeciauxActions.addObjSpeciauxSuccess(res.data)
                ),
                yield put(
                    getObjSpeciauxActions.getObjSpeciauxRequest(
                        response[0].declaration
                    )
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(11)
                ),
            ])
        } else {
            yield put(addObjSpeciauxActions.addObjSpeciauxFailure(res.data))
        }
    } catch (error) {
        yield put(addObjSpeciauxActions.addObjSpeciauxFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addObjSpeciauxSaga() {
    yield takeLatest(
        addObjSpeciauxTypes.ADD_OBJ_SPECIAUX_REQUEST,
        addObjSpeciauxSagas
    )
}
