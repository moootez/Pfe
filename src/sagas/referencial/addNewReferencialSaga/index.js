/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addNewReferencialActions, {
    addNewReferenceTypes,
} from '../../../redux/referencial/addNewReferencial'
import getAllReferencialActions from '../../../redux/referencial/getAllReferencial/index'
import { Post } from '../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* addNewReferencialSagas({ response }) {
    try {
        const responseAdd = yield Post('referenciel/new', { ...response })

        if (responseAdd.status === 200 || responseAdd.status === 201) {
            yield all([
                yield put(
                    addNewReferencialActions.addNewReferenceSuccess(
                        responseAdd.data
                    )
                ),
                yield put(
                    getAllReferencialActions.getAllReferenceRequest({
                        dontNavigate: false,
                    })
                ),
            ])
        } else {
            yield put(
                addNewReferencialActions.addNewReferenceFailure(
                    responseAdd.data
                )
            )
        }
    } catch (error) {
        yield put(
            addNewReferencialActions.addNewReferenceFailure(
                error,
                response.categorie
            )
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* addNewReferencialSaga() {
    yield takeLatest(
        addNewReferenceTypes.ADD_NEW_REFERENCE_REQUEST,
        addNewReferencialSagas
    )
}
