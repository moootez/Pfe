/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getFilterDeclarationsForVerificationActions, {
    getFilterDeclarationsForVerificationTypes,
} from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDecForVerification'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getFilterDeclarationsForVerificationSagas({ response }) {
    try {
        const res = yield Post('declaration/list/verification', response)
        if (res.status === 200) {
            yield all([
                yield put(
                    getFilterDeclarationsForVerificationActions.getFilterDeclarationsForVerificationSuccess(
                        res.data
                    )
                ),
            ])
        } else {
            yield put(
                getFilterDeclarationsForVerificationActions.getFilterDeclarationsForVerificationFailure(
                    res.data.data
                )
            )
        }
    } catch (error) {
        yield put(
            getFilterDeclarationsForVerificationActions.getFilterDeclarationsForVerificationFailure(
                error
            )
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* getFilterDeclarationsForVerificationSaga() {
    yield takeLatest(
        getFilterDeclarationsForVerificationTypes.GET_FILTER_DECLARATIONS_FOR_VERIFICATION_REQUEST,
        getFilterDeclarationsForVerificationSagas
    )
}
