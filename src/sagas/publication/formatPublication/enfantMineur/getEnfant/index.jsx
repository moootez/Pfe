/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getEnfantPublicationActions, {
    getEnfantTypes,
} from '../../../../../redux/publication/formatPublication/enfantsMineurs/getEnfantMineur'
import { Get } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getEnfantPublicationSagas() {
    try {
        const res = yield Get('publication/filtre/RefEnfant')
        if (res.status === 200 || res.status === 201) {
            yield put(
                getEnfantPublicationActions.getEnfantPublicationSuccess(
                    res.data
                )
            )
        } else {
            yield put(
                getEnfantPublicationActions.getEnfantPublicationFailure(
                    res.data
                )
            )
        }
    } catch (error) {
        yield put(
            getEnfantPublicationActions.getEnfantPublicationFailure(error)
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* getEnfantPublicationSaga() {
    yield takeLatest(
        getEnfantTypes.GET_ENFANT_PUBLICATION_REQUEST,
        getEnfantPublicationSagas
    )
}
