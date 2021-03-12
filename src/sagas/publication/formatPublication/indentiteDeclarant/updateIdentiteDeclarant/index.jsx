/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import updateIdentiteDeclarantPublicationActions, {
    updateIdentiteDeclarantTypes,
} from '../../../../../redux/publication/formatPublication/identiteDeclarant/updateIdentiteDeclarant'
import { Patch } from '../../../../../serveur/axios'

/**
 * consomation API avec axios
 *
 * @param {*} { response }
 */
function* updateIdentiteDeclarantPublicationSagas({ response }) {
    try {
        const res = yield Patch('publication/appuser', response)
        if (res.status === 200 || res.status === 201) {
            yield put(
                updateIdentiteDeclarantPublicationActions.updateIdentiteDeclarantPublicationSuccess(
                    res.data
                )
            )
        } else {
            yield put(
                updateIdentiteDeclarantPublicationActions.updateIdentiteDeclarantPublicationFailure(
                    res.data
                )
            )
        }
    } catch (error) {
        yield put(
            updateIdentiteDeclarantPublicationActions.updateIdentiteDeclarantPublicationFailure(
                error
            )
        )
    }
}

/**
 * appele à la fonction with key action
 */
export function* updateIdentiteDeclarantPublicationSaga() {
    yield takeLatest(
        updateIdentiteDeclarantTypes.UPDATE_IDENTITE_DECLARANT_PUBLICATION_REQUEST,
        updateIdentiteDeclarantPublicationSagas
    )
}
