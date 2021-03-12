/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import updateEnfantPublicationActions, {
    updateEnfantTypes,
} from '../../../../../redux/publication/formatPublication/enfantsMineurs/updateEnfantMineur'
import getAllFormatPublicationActions from '../../../../../redux/publication/formatPublication/getAllFormatPublication'
import { Put } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateEnfantPublicationSagas({ response }) {
    try {
        const res = yield Put('publication/RefEnfant', response)
        if (res.status === 200 || res.status === 201) {
            yield put(
                updateEnfantPublicationActions.updateEnfantPublicationSuccess(
                    res.data
                )
            )
            yield put(
                getAllFormatPublicationActions.getAllFormatPublicationRequest()
            )
        } else {
            yield put(
                updateEnfantPublicationActions.updateEnfantPublicationFailure(
                    res.data
                )
            )
        }
    } catch (error) {
        yield put(
            updateEnfantPublicationActions.updateEnfantPublicationFailure(error)
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateEnfantPublicationSaga() {
    yield takeLatest(
        updateEnfantTypes.UPDATE_ENFANT_PUBLICATION_REQUEST,
        updateEnfantPublicationSagas
    )
}
