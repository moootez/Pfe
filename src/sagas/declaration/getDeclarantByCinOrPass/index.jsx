import { takeLatest, put, all } from 'redux-saga/effects'
import getDeclarantByCinOrPassActions, {
    getDeclarantByCinOrPassTypes,
} from '../../../redux/declaration/getDeclarantByCinOrPass'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getDeclarantByCinOrPassSagas({ response }) {
    try {
        const res = yield Post('users/verify-exist-user', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    getDeclarantByCinOrPassActions.getDeclarantByCinOrPassSuccess(
                        res.data
                    )
                ),
            ])
        } else {
            yield put(
                getDeclarantByCinOrPassActions.getDeclarantByCinOrPassFailure(
                    res
                )
            )
        }
    } catch (error) {
        yield put(
            getDeclarantByCinOrPassActions.getDeclarantByCinOrPassFailure(error)
        )
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getDeclarantByCinOrPassSaga() {
    yield takeLatest(
        getDeclarantByCinOrPassTypes.GET_DECLARANT_BY_CIN_OR_PASS_REQUEST,
        getDeclarantByCinOrPassSagas
    )
}
