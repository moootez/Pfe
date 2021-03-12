/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updateObjSpeciauxActions, {
    updateObjSpeciauxTypes,
} from '../../../../../redux/declaration_grab/bien/objSpeciaux/updateObjSpeciaux/index'
import getObjSpeciauxActions from '../../../../../redux/declaration_grab/bien/objSpeciaux/getObjSpeciaux/index'
import { Patch } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateObjSpeciauxSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `objectprecious/${response[0].declaration}`,
            response
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updateObjSpeciauxActions.updateObjSpeciauxSuccess(
                        responseEdit.data
                    )
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
            yield put(
                updateObjSpeciauxActions.updateObjSpeciauxFailure(
                    responseEdit.data
                )
            )
        }
    } catch (error) {
        yield put(updateObjSpeciauxActions.updateObjSpeciauxFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateObjSpeciauxSaga() {
    yield takeLatest(
        updateObjSpeciauxTypes.UPDATE_OBJ_SPECIAUX_REQUEST,
        updateObjSpeciauxSagas
    )
}
