/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getConjointActions, {
    getConjointTypes,
} from '../../../../../redux/publication/formatPublication/conjoint/getConjoint'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getConjointSagas() {
    try {
        const res = yield Get('publication/filtre/RefConjoint')

        if (res.status === 200 || res.status === 201) {
            yield put(
                getConjointActions.getConjointPublicationSuccess(res.data)
            )
        } else {
            yield put(
                getConjointActions.getConjointPublicationFailure(res.data)
            )
        }
    } catch (error) {
        yield put(getConjointActions.getConjointPublicationFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export default function* getConjointPublicationSaga() {
    yield takeLatest(
        getConjointTypes.GET_CONJOINT_PUBLICATION_REQUEST,
        getConjointSagas
    )
}
