/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import getAllFormatPublicationActions, {
    getAllFormatTypes,
} from '../../../../redux/publication/formatPublication/getAllFormatPublication'
import { Get } from '../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* getAllFormatPublicationSagas() {
    try {
        const res = yield Get('publication/all')
        if (res.status === 200 || res.status === 201) {
            yield put(
                getAllFormatPublicationActions.getAllFormatPublicationSuccess(
                    res.data
                )
            )
        } else {
            yield put(
                getAllFormatPublicationActions.getAllFormatPublicationFailure(
                    res.data
                )
            )
        }
    } catch (error) {
        yield put(
            getAllFormatPublicationActions.getAllFormatPublicationFailure(error)
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* getAllFormatPublicationSaga() {
    yield takeLatest(
        getAllFormatTypes.GET_ALL_FORMAT_PUBLICATION_REQUEST,
        getAllFormatPublicationSagas
    )
}
