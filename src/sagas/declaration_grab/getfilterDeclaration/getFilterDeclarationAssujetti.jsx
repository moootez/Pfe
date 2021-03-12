/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getFilterDeclarationAssujettiActions, {
    getFilterDeclarationsAssujettiTypes,
} from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDeclarationsAssujetti'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getFilterDeclarationAssujettiSagas({ response }) {
    try {
        const res = yield Post('assujettideclaration/list', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    getFilterDeclarationAssujettiActions.getFilterDeclarationsAssujettiSuccess(
                        res.data
                    )
                ),
            ])
        } else {
            yield put(
                getFilterDeclarationAssujettiActions.getFilterDeclarationsAssujettiFailure(
                    res.data.data
                )
            )
        }
    } catch (error) {
        yield put(
            getFilterDeclarationAssujettiActions.getFilterDeclarationsAssujettiFailure(
                error
            )
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* getFilterDeclarationsAssujettiSaga() {
    yield takeLatest(
        getFilterDeclarationsAssujettiTypes.GET_FILTER_DECLARATIONS_ASSUJETTI_REQUEST,
        getFilterDeclarationAssujettiSagas
    )
}
