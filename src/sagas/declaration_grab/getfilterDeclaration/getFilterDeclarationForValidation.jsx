/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getFilterDeclarationsForValidationActions, {
    getFilterDeclarationsForValidationTypes,
} from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDecForValidation'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getFilterDeclarationsForValidationSagas({ response }) {
    try {
        const res = yield Post('declaration/list/validation', response)
        if (res.status === 200) {
            yield all([
                yield put(
                    getFilterDeclarationsForValidationActions.getFilterDeclarationsForValidationSuccess(
                        res.data
                    )
                ),
            ])
        } else {
            yield put(
                getFilterDeclarationsForValidationActions.getFilterDeclarationsForValidationFailure(
                    res.data.data
                )
            )
        }
    } catch (error) {
        yield put(
            getFilterDeclarationsForValidationActions.getFilterDeclarationsForValidationFailure(
                error
            )
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* getFilterDeclarationsForValidationSaga() {
    yield takeLatest(
        getFilterDeclarationsForValidationTypes.GET_FILTER_DECLARATIONS_FOR_VALIDATION_REQUEST,
        getFilterDeclarationsForValidationSagas
    )
}
