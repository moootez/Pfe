/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getFilterDeclarationsForPublicationActions, {
    getFilterDeclarationsForPublicationTypes,
} from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDecForPublication'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getFilterDeclarationsForPublicationSagas({ response }) {
    try {
        const res = yield Post('declaration/list/publication', response)
        if (res.status === 200) {
            yield all([
                yield put(
                    getFilterDeclarationsForPublicationActions.getFilterDeclarationsForPublicationSuccess(
                        res.data
                    )
                ),
            ])
        } else {
            yield put(
                getFilterDeclarationsForPublicationActions.getFilterDeclarationsForPublicationFailure(
                    res.data.data
                )
            )
        }
    } catch (error) {
        yield put(
            getFilterDeclarationsForPublicationActions.getFilterDeclarationsForPublicationFailure(
                error
            )
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* getFilterDeclarationsForPublicationSaga() {
    yield takeLatest(
        getFilterDeclarationsForPublicationTypes.GET_FILTER_DECLARATIONS_FOR_PUBLICATION_REQUEST,
        getFilterDeclarationsForPublicationSagas
    )
}
