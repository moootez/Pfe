/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getFilterDeclarationsActions, {
    getFilterDeclarationsTypes,
} from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDeclarations'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getFilterDeclarationsSagas({ response }) {
    try {
        const res = yield Post('declaration/list/status', response)
        if (res.status === 200) {
            yield all([
                yield put(
                    getFilterDeclarationsActions.getFilterDeclarationsSuccess(
                        res.data
                    )
                ),
            ])
        } else {
            yield put(
                getFilterDeclarationsActions.getFilterDeclarationsFailure(
                    res.data.data
                )
            )
        }
    } catch (error) {
        yield put(
            getFilterDeclarationsActions.getFilterDeclarationsFailure(error)
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* getFilterDeclarationsSaga() {
    yield takeLatest(
        getFilterDeclarationsTypes.GET_FILTER_DECLARATIONS_REQUEST,
        getFilterDeclarationsSagas
    )
}
