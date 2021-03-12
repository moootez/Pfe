/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getFilterInscriptionActions, {
    getFilterInscriptionTypes,
} from '../../../redux/inscription/getFiltreInscription'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getFilterInscriptionSagas({ response }) {
    try {
        const res = yield Post(`declarant-inscription/bypage`, response)
        if (res.status === 200) {
            yield put(
                getFilterInscriptionActions.getFilterInscriptionSuccess(
                    res.data
                )
            )
        } else {
            yield put(
                getFilterInscriptionActions.getFilterInscriptionFailure(
                    res.data.data
                )
            )
        }
    } catch (error) {
        yield put(
            getFilterInscriptionActions.getFilterInscriptionFailure(error)
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* getFilterInscriptionSaga() {
    yield takeLatest(
        getFilterInscriptionTypes.GET_FILTER_INSCRIPTION_REQUEST,
        getFilterInscriptionSagas
    )
}
