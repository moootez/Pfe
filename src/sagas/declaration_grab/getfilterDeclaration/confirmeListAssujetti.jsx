/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import confirmeListAssujettiActions, {
    confirmeListAssujettiTypes,
} from '../../../redux/declaration_grab/getfilterDeclaration/confirmeListAssujetti'
// import getFilterDeclarationAssujettiActions from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDeclarationsAssujetti'
import { Post, Delete } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* confirmeListAssujettiSagas({ response }) {
    try {
        const res = yield Post(
            'declaration/confirm/checked_assujettie',
            response.arrayDec
        )
        if (res.status === 200 || res.status === 201) {
            const resForDelete = yield Delete(
                'assujettideclaration/delete/list',
                {
                    id: response.arrayForDelete,
                }
            )
            if (resForDelete.status === 200 || resForDelete.status === 201)
                yield all([
                    yield put(
                        confirmeListAssujettiActions.confirmeListAssujettiSuccess(
                            res.data
                        )
                    ),
                    // yield put(
                    //     getFilterDeclarationAssujettiActions.getFilterDeclarationsAssujettiRequest(
                    //         { limit: 5, page: 1 }
                    //     )
                    // ),
                ])
        } else {
            yield put(
                confirmeListAssujettiActions.confirmeListAssujettiFailure(
                    res.data.data
                )
            )
        }
    } catch (error) {
        yield put(
            confirmeListAssujettiActions.confirmeListAssujettiFailure(error)
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* confirmeListAssujettiSaga() {
    yield takeLatest(
        confirmeListAssujettiTypes.CONFIRME_LIST_ASSUJETTI_REQUEST,
        confirmeListAssujettiSagas
    )
}
