/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getPartSocialsActions, {
    getPartSocialsTypes,
} from '../../../../../redux/declaration_grab/bien/partSocials/getPartSocials/index'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getPartSocialsSagas({ response }) {
    try {
        const res = yield Get(`shares/${response}`)
        if (res.status === 200) {
            yield put(getPartSocialsActions.getPartSocialsSuccess(res.data))
        } else {
            yield put(getPartSocialsActions.getPartSocialsFailure(res.data))
        }
    } catch (error) {
        yield put(getPartSocialsActions.getPartSocialsFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getPartSocialsSaga() {
    yield takeLatest(
        getPartSocialsTypes.GET_PART_SOCIALS_REQUEST,
        getPartSocialsSagas
    )
}
