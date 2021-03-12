/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getFilterDeclarationsForRapprochementActions, {
    getFilterDeclarationsForRapprochementTypes,
} from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDecForRapprochement'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getFilterDeclarationsForRapprochementSagas({ response }) {
    try {
        const res = yield Post('declaration/list/rapprochement', response)
        if (res.status === 200) {
            yield all([
                yield put(
                    getFilterDeclarationsForRapprochementActions.getFilterDeclarationsForRapprochementSuccess(
                        res.data
                    )
                ),
            ])
        } else {
            yield put(
                getFilterDeclarationsForRapprochementActions.getFilterDeclarationsForRapprochementFailure(
                    res.data.data
                )
            )
        }
    } catch (error) {
        yield put(
            getFilterDeclarationsForRapprochementActions.getFilterDeclarationsForRapprochementFailure(
                error
            )
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* getFilterDeclarationsForRapprochementSaga() {
    yield takeLatest(
        getFilterDeclarationsForRapprochementTypes.GET_FILTER_DECLARATIONS_FOR_RAPPROCHEMENT_REQUEST,
        getFilterDeclarationsForRapprochementSagas
    )
}
