/* eslint-disable import/prefer-default-export */
import { takeLatest, put, call, all } from 'redux-saga/effects' // eslint-disable-line
import deleteReferencesActions, {
    deleteReferenceTypes,
} from '../../../redux/referencial/deleteReferencial'
import getAllReferencesActions from '../../../redux/referencial/getAllReferencial'
import { Delete } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* deleteReferencialSagas(response) {
    try {
        const responseDelete = yield Delete(`referenciel/${response.response}`)
        if (responseDelete.status === 200 || responseDelete.status === 201) {
            yield all([
                yield put(
                    deleteReferencesActions.deleteReferenceSuccess(
                        responseDelete.data
                    )
                ),
                yield put(
                    getAllReferencesActions.getAllReferenceRequest({
                        dontNavigate: true,
                    })
                ),
            ])
        } else {
            yield put(
                deleteReferencesActions.deleteReferenceFailure(
                    responseDelete.data
                )
            )
        }
    } catch (error) {
        yield put(deleteReferencesActions.deleteReferenceFailure(error))
    }
}

/**
 * appele à la fonction with key action
 */
export function* deleteReferencialSaga() {
    yield takeLatest(
        deleteReferenceTypes.DELETE_REFERENCE_REQUEST,
        deleteReferencialSagas
    )
}
