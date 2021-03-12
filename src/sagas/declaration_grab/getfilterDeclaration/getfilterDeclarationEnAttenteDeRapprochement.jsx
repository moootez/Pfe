/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getFilterDeclarationsEnAttenteDeRapprochementActions, {
    getFilterDeclarationsEnAttenteDeRapprochementTypes,
} from '../../../redux/declaration_grab/getfilterDeclaration/getFilterDecEnAttenteDeRapprochement'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getFilterDeclarationsEnAttenteDeRapprochementSagas({ response }) {
    try {
        const res = yield Post(
            `affectation/list/rapprocher/${response.id}`,
            response
        )
        if (res.status === 200) {
            yield all([
                yield put(
                    getFilterDeclarationsEnAttenteDeRapprochementActions.getFilterDeclarationsEnAttenteDeRapprochementSuccess(
                        res.data
                    )
                ),
            ])
        } else {
            yield put(
                getFilterDeclarationsEnAttenteDeRapprochementActions.getFilterDeclarationsEnAttenteDeRapprochementFailure(
                    res.data.data
                )
            )
        }
    } catch (error) {
        yield put(
            getFilterDeclarationsEnAttenteDeRapprochementActions.getFilterDeclarationsEnAttenteDeRapprochementFailure(
                error
            )
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* getFilterDeclarationsEnAttenteDeRapprochementSaga() {
    yield takeLatest(
        getFilterDeclarationsEnAttenteDeRapprochementTypes.GET_FILTER_DECLARATIONS_EN_ATTENTE_DE_RAPPROCHEMENT_REQUEST,
        getFilterDeclarationsEnAttenteDeRapprochementSagas
    )
}
