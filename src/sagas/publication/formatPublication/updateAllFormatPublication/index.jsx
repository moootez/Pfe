/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import updateFormatPublicationActions, {
    updateFormatTypes,
} from '../../../../redux/publication/formatPublication/updateFormatPublication'
import getAllFormatPublicationActions from '../../../../redux/publication/formatPublication/getAllFormatPublication'
import { Put } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateFormatPublicationSagas({ response }) {
    try {
        const res = yield Put(`publication/${response.categorie}`, response.obj)
        if (res.status === 200 || res.status === 201) {
            yield put(
                updateFormatPublicationActions.updateFormatPublicationSuccess(
                    res.data
                )
            )
            yield put(
                getAllFormatPublicationActions.getAllFormatPublicationRequest()
            )
        } else {
            yield put(
                updateFormatPublicationActions.updateFormatPublicationFailure(
                    res.data
                )
            )
        }
    } catch (error) {
        yield put(
            updateFormatPublicationActions.updateFormatPublicationFailure(error)
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateFormatPublicationSaga() {
    yield takeLatest(
        updateFormatTypes.UPDATE_FORMAT_PUBLICATION_REQUEST,
        updateFormatPublicationSagas
    )
}
