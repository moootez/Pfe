/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addPartSocialsActions, {
    addPartSocialsTypes,
} from '../../../../../redux/declaration_grab/bien/partSocials/addPartSocials/index'
import getPartSocialsActions from '../../../../../redux/declaration_grab/bien/partSocials/getPartSocials/index'
import { Post } from '../../../../../serveur/axios'
import changeStepDeclarationActions from '../../../../../redux/step_saisie/index'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addPartSocialsSagas({ response }) {
    try {
        const res = yield Post('shares/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    addPartSocialsActions.addPartSocialsSuccess(res.data)
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
            yield put(addPartSocialsActions.addPartSocialsFailure(res.data))
        }
    } catch (error) {
        yield put(addPartSocialsActions.addPartSocialsFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* addPartSocialsSaga() {
    yield takeLatest(
        addPartSocialsTypes.ADD_PART_SOCIALS_REQUEST,
        addPartSocialsSagas
    )
}
