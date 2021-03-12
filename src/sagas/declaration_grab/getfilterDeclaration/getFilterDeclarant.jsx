/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getFilterDeclarantActions, {
    getFilterDeclarantTypes,
} from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDeclarant'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getFilterDeclarantSagas({ response }) {
    try {
        const res = yield Post('users/list/publication', response)
        if (res.status === 200) {
            yield all([
                yield put(
                    getFilterDeclarantActions.getFilterDeclarantSuccess(
                        res.data
                    )
                ),
            ])
        } else {
            yield put(
                getFilterDeclarantActions.getFilterDeclarantFailure(
                    res.data.data
                )
            )
        }
    } catch (error) {
        yield put(getFilterDeclarantActions.getFilterDeclarantFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* getFilterDeclarantSaga() {
    yield takeLatest(
        getFilterDeclarantTypes.GET_FILTER_DECLARANT_REQUEST,
        getFilterDeclarantSagas
    )
}
