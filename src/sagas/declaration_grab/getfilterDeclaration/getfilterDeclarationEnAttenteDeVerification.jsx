/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getFilterDeclarationsEnAttenteDeVerificationActions, {
    getFilterDeclarationsEnAttenteDeVerificationTypes,
} from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDecEnAttenteDeVerification'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getFilterDeclarationsEnAttenteDeVerificationSagas({ response }) {
    try {
        const res = yield Post(
            `affectation/list/controller/${response.id}`,
            response
        )
        if (res.status === 200) {
            yield all([
                yield put(
                    getFilterDeclarationsEnAttenteDeVerificationActions.getFilterDeclarationsEnAttenteDeVerificationSuccess(
                        res.data
                    )
                ),
            ])
        } else {
            yield put(
                getFilterDeclarationsEnAttenteDeVerificationActions.getFilterDeclarationsEnAttenteDeVerificationFailure(
                    res.data.data
                )
            )
        }
    } catch (error) {
        yield put(
            getFilterDeclarationsEnAttenteDeVerificationActions.getFilterDeclarationsEnAttenteDeVerificationFailure(
                error
            )
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* getFilterDeclarationsEnAttenteDeVerificationSaga() {
    yield takeLatest(
        getFilterDeclarationsEnAttenteDeVerificationTypes.GET_FILTER_DECLARATIONS_EN_ATTENTE_DE_VERIFICATION_REQUEST,
        getFilterDeclarationsEnAttenteDeVerificationSagas
    )
}
