/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import updatePartSocialsActions, {
    updatePartSocialsTypes,
} from '../../../../../redux/declaration_grab/bien/partSocials/updatePartSocials/index'
import getPartSocialsActions from '../../../../../redux/declaration_grab/bien/partSocials/getPartSocials/index'
import { Patch } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updatePartSocialsSagas({ response }) {
    try {
        const responseEdit = yield Patch(
            `shares/${response[0].declaration}`,
            response
        )
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield all([
                yield put(
                    updatePartSocialsActions.updatePartSocialsSuccess(
                        responseEdit.data
                    )
                ),
                yield put(
                    getPartSocialsActions.getPartSocialsRequest(
                        response[0].declaration
                    )
                ),
                yield put(
                    changeStepDeclarationActions.changeStepDeclaration(5)
                ),
            ])
        } else {
            yield put(
                updatePartSocialsActions.updatePartSocialsFailure(
                    responseEdit.data
                )
            )
        }
    } catch (error) {
        yield put(updatePartSocialsActions.updatePartSocialsFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* updatePartSocialsSaga() {
    yield takeLatest(
        updatePartSocialsTypes.UPDATE_PART_SOCIALS_REQUEST,
        updatePartSocialsSagas
    )
}
